var Mediator = function(){
    this.self = this;
    this.className = "Mediator";


    this.channels = {}
   
}

Mediator.prototype.add = function (channel,member){

    //check to see if channel excists
    if (!this.channels[channel]) this.channels[channel] = []

    //check to see if member is already listening to channel
    for(var i=0; i<this.channels[channel].length;i++ ){ 
        if (this.channels[channel][i] === member){
            //console.log("Mediator: Allready a member of " + channel);
            return
        }    
    }
    
    //add member to channel
    this.channels[channel].push(member)

    //decorate member
    member.mediator = this;
    member.emit = function (channel,evt){
        this.mediator.emit(channel,evt)
    }
}

//*
Mediator.prototype.remove = function (channel, member){
    for(var i=0; i<this.channels[channel].length;i++ ){ 
            if(this.channels[channel][i]===member){
                this.channels[channel].splice(i,1);
                return;
            }
      } 
    member.mediator = undefined;
}
//*/

Mediator.prototype.emit = function (channel,env){
     for(var i=0; i<this.channels[channel].length; i++){ 
        try{
            this.channels[channel][i].on(env)
        } catch (err){
            //oh noooo
        }
    }
}

module.exports = function(){
    return new Mediator();
} 