var Mediator = function(){
    this.className = "::Mediator::";

    this.channels = {};
    
    return this;
};

Mediator.prototype.toString = function (){          
    return "::Mediator::";
};

Mediator.prototype.add = function (member, event, fn){

    //check to see if event excists
    if (!this.channels[event]) this.channels[event] = [];

    //check to see if member is already listening to event
    for(var i=0; i<this.channels[event].length;i++ ){
        if (this.channels[event][i] === {member:member,fn:fn}){
            console.log("Mediator: Allready a member of " + event);
            return;
        }
    }
    
    //add member to event
    this.channels[event].push({member:member,fn:fn});

    //decorate member
    if (!member.mediators) member.mediators = [];

    member.mediators.push(this);

    member.emit = function (event,evt){
        for(var i = 0; i < this.mediators.length; i++){
            //console.log(this.mediators[i]);
            if (this.mediators[i].hasChannel(event)){
              this.mediators[i].emit(event,evt);
              return;
            }
        }
    };


};

Mediator.prototype.hasChannel = function (event){
    for(var i in this.channels){
        if(i === event){
            return true;
        }
    }

    return false;
 
};

Mediator.prototype.remove = function (event, member){
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

Mediator.prototype.removeFromAll = function (member){
    for (var i in this.channels){
           this.remove(i,member);
    }
}    


Mediator.prototype.emit = function (event,env){
     if (!this.channels[event]) console.log("Mediator.emit: There is no channel called " + event); //return;
     var evObj;
     
     for(var i=0; i<this.channels[event].length; i++){

        try{
             //get event and fire it
             evObj = this.channels[event][i];

            //to secure backward comp where callback could trigger any function, test to see if string
            if (typeof  this.channels[event][i].fn === "string") {
               evObj.member[evObj.fn](env);
            } else {
                this.channels[event][i].fn(env);
            }

        } catch (err){
            //oh noooo
            //console.log("No callback set: "+err);
        }
    }
};


module.exports = function(){
    return new Mediator();
};