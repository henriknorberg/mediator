mediator
========

Mediator pattern implementation for Node.js.  

example
=======

````javascript

var Mediator = require('../index'),
    mediator =  new Mediator(),
    // Add a couple of members
    member0 = {},
    member1 = {};

//add the members to the mediator
mediator.add(member0,"testEvent0",member0Callback);
mediator.add(member1,"testEvent0","member1Callback");

//inline callback
mediator.add(member1,"testEvent1",function(rs){
    console.log("-> testEvent1 " + rs.res);
});

//add a regular callback
function member0Callback (rs){
    console.log("-> member0Callback " + rs.res);
};

//add a callback inside object
member1.member1Callback = function (rs){
    console.log("-> member1Callback " + rs.res);
};

//emit some events
member0.emit("testEvent0", {res:"word"});
member1.emit("testEvent1", {res:"yo"});

//removelistener
mediator.remove("testEvent0",member1);
//...and check if is still listening
member0.emit("testEvent0", {res:"word"});

````


install
=======

With [npm](http://npmjs.org) do:

```
npm install mediator
```