var Mediator = function(){
    this.className = "::Mediator::";
    this.channels = {};
    this.anonMember = {};

    return this;
};

Mediator.prototype.toString = function (){          
    return "::Mediator::";
};

Mediator.prototype.on = function (event, fn){
    this.add(this.anonMember, event, fn);
    return this;
}

Mediator.prototype.addListener = Mediator.prototype.on; 

/*
Mediator.prototype.once = function (event, fn){
   
    return this;
}
*/

Mediator.prototype.add = function (member, event, fn){
    var that = this;
    //check to see if event excists
    if (!this.channels[event]) this.channels[event] = [];

    //check to see if member is already listening to event
    for(var i=0; i<this.channels[event].length;i++ ){
        if (this.channels[event][i] === {member:member,fn:fn}){
            console.log("Mediator: Allready a member of " + event);
            return;
        }
    }
    
    //add member to event channel
    this.channels[event].push({member:member,fn:fn});

    //decorate member
    if (!member.mediators) member.mediators = [];

    //Make sure it only one copy of the same mediator
    if(member.mediators.indexOf(this) === -1) member.mediators.push(this);

    if (!member.emit){
        member.emit = function (event,evt){
            for(var i = 0; i < this.mediators.length; i++){
                if (this.mediators[i].hasChannel(event)){
                  this.mediators[i].emit(event,evt);
                }
            }
        };
    }

};

Mediator.prototype.emit = function (event,env){

    var args = Array.prototype.slice.call(arguments)
    args = args.slice(1,args.length);    
    
    var evObj;
    var err = null;

     if (!this.channels[event]) console.log("Mediator.emit: There is no channel called " + event); //return;}

     for(var i=0; i<this.channels[event].length; i++){

        try{
             //get event and fire it
             evObj = this.channels[event][i];

            //to secure backward comp where callback could trigger any function, test to see if string
            if (typeof  this.channels[event][i].fn === "string") {
               console.alert("Mediator: Callback as string is depcriated. Please use a real function");
               evObj.member[evObj.fn].apply(this, args);
            } else {
                this.channels[event][i].fn.apply(this,args);
            }

        } catch (err){
            this.channels[event][i].fn.apply(this,args);
            //oh noooo
            //console.log("No callback set: "+err);
        }
    }
};

Mediator.prototype.hasChannel = function (event){
    for(var i in this.channels){
        if(i === event){
            return true;
        }
    }
    return false;
 
};

Mediator.prototype.remove = function (member, event){
    for(var i=0; i<this.channels[event].length;i++ ){
            if(this.channels[event][i].member===member){
                this.channels[event].splice(i,1);
                //console.log("Mediator: Removed member from " + event + " " + this.channels[event].length);
                return;
            }
      }
    member.mediator = undefined;
    //not removing emit in case listening to another instance...
};

Mediator.prototype.removeAllListeners = function (event){
    for(var i=0; i<this.channels[event].length;i++ ){
                this.channels[event].splice(i,1);
      }
};

Mediator.prototype.removeFromAll = function (member){
    for (var i in this.channels){
           this.remove(i,member);
    }
}    





module.exports = function(){
    return new Mediator();
};