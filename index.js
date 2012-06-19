var Mediator = function(){
    this.self = this;
    this.className = "Mediator";


    this.channels = {};
   
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
    member.mediator = this;
    member.emit = function (event,evt){
        this.mediator.emit(event,evt);
    };
};

//*
Mediator.prototype.remove = function (event, member){
    for(var i=0; i<this.channels[event].length;i++ ){
            if(this.channels[event][i].member===member){
                this.channels[event].splice(i,1);
                return;
            }
      }
    member.mediator = undefined;
    //not removing emit in case listening to another instance...
};
//*/

Mediator.prototype.emit = function (event,env){
     for(var i=0; i<this.channels[event].length; i++){
        try{
            this.channels[event][i].fn(env); //get event and fire it
            //console.log(typeof this.channels[event][i].fn)
        } catch (err){
            //oh noooo
            //console.log(typeof this.channels[event][i].fn)
        }
    }
};

module.exports = function(){
    return new Mediator();
};