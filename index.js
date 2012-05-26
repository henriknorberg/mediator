Mediator = function(){
    this.self = this;
    this.className = "Mediator";


    this.channels = []
   
}

Mediator.prototype.add = function (channel,member){

    //check to see if channel excists
    if (!this.channels[channel]) this.channels[channel] = []
    
    //add member to channel
    this.channels[channel].push(member)

    //decorate member
    member.mediator = this;
    member.emit = function (channel,evt){
        this.mediator.emit(channel,evt)
    }
}

/*
Mediator.prototype.remove = function (member){
    //should also clean up channels

    for(var i=0; i<this.chanels.length;i++ ){ 
      if(this.chanels[i]==member){
        members.splice(i,1); 
      }  
    } 

    member.mediator = undefined;
    
}
*/

Mediator.prototype.emit = function (channel,env){
        
     for(var i=0; i<this.channels[channel].length; i++){ 
        
        try{
            this.channels[channel][i].on(env)
        } catch (err){

        }
    }
}

module.exports = function(){
    return new Mediator();
} 