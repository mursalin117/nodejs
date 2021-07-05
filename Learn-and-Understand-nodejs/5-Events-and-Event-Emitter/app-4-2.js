// Internal Event-Emitter is used

var Emitter = require('events');
var eventConfig = require('./config-4-2').events;

var emtr = new Emitter();

emtr.on(eventConfig.GREET, function() { // providing the event name and the function to do
    console.log('Somewhere, someone said hello.');
})

emtr.on(eventConfig.GREET, function() { // another funciton for the same event
    console.log('A greeting occured!');
})

console.log('Hello');
emtr.emit(eventConfig.GREET); // executing all the function under same-name-event