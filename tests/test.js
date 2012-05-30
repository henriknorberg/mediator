var Mediator = require('../index'),
    mediator =  new Mediator(),
    member0 = {},
    member1 = {}


mediator.add("testChannel1",member0);
mediator.add("testChannel1",member0);

mediator.add("testChannel1",member1);
mediator.add("testChannel2",member1);

member0.on = function(rs){
    console.log("-> on.memb0 " + rs.res);
}
member1.on = function(rs){
    console.log("-> on.memb1 " + rs.res);
}


member1.emit("testChannel1", {res:"word"});
member1.emit("testChannel2", {res:"yo"});

mediator.remove("testChannel1",member0);
member1.emit("testChannel1", {res:"word"});


mediator.remove("testChannel2",member1);