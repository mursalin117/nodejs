console.log('Hello');

// another funciton
var greet = function() {
    console.log('Hello there');
}
greet();

var greetFG = function() {
    console.log('Hello from greet');
}

module.exports = greetFG;