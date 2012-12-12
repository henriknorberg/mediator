var Mediator = require('../index'),
    mediator =  new Mediator(),

    // Add a couple of members
    member0 = {},
    member1 = function(){};

console.log("-=| Mediator Test Implementation |=-");

//add the members to the mediator
mediator.add(member0,"testEvent0",member0Callback);
mediator.add(member1,"testEvent0",member1Callback);

//inline callback
mediator.add(member1,"testEvent1",function(rs){
    console.log("-> member1 testEvent1 " + rs);
});

//anon with inline callback
mediator.on("testEvent1", function(rs){
    console.log("-> Anon testEvent1 " + rs.res);
});

//add a few callbacks
function member0Callback (rs){
    console.log("-> member0 Callback " + rs);
};

function member1Callback (rs){
    console.log("-> member1 Callback " + rs);
};


//emit some events
member0.emit("testEvent0", "word");
member1.emit("testEvent1", {res:"yo"});




//removelistener
mediator.remove(member1,"testEvent0");
//...and check if is still listening
member0.emit("testEvent0", {res:"this should be triggered only by member 0"});

//removeall listeners
mediator.removeAllListeners("testEvent0");
member0.emit("testEvent0", {res:"this should not be triggered AT ALL"});

/**/
console.log("-=| All test done |=-");