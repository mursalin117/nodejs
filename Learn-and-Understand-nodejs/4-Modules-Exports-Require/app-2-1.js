// function statement
function greet() {
    console.log('hi');
}
greet();

// function are first-class
function logGreet(fn) {
    fn();
}
logGreet(greet);

// function expression
var greetMe = function() {
    console.log('Hi! Me');
}
greetMe();

// it's first-class
logGreet(greetMe);

// use a function expression on the fly
logGreet(function() {
    console.log('Hello! Me');
});