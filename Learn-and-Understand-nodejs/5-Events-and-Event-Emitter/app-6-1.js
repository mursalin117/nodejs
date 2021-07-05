var EventEmitter = require('events');
var util = require('util');

function Greetr() {
    this.greeting = 'Hello world!';
}

// using util.inherit() to create a function that has both the access of Greeter and EventEmitter
util.inherits(Greetr, EventEmitter);

// also adding new property in Greeter after it
Greetr.prototype.greet = function() {
    console.log(this.greeting);
    // this will have access to both Greetr and EventEmitter
    this.emit('greet'); // .emit(type) executes the function of .on(type, function(listener))
}

var greeter1 = new Greetr();

greeter1.on('greet', function() { // creates an array named 'greet' and push the function to it
    console.log('Someone greeted!');
});

greeter1.greet();

