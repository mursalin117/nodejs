// Internal Event-Emitter is used

var Emitter = require('events');

var emtr = new Emitter();

emtr.on('greet', function() { // providing the event name and the function to do
    console.log('Somewhere, someone said hello.');
})

emtr.on('greet', function() { // another funciton for the same event
    console.log('A greeting occured!');
})

console.log('Hello');
emtr.emit('greet'); // executing all the function under same-name-event