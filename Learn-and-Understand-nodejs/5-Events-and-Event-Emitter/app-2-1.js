// Object properties and method

var obj = {
    greet: 'Hello'
};

console.log(obj.greet);
console.log(obj['greet']);
var prop = 'greet';
console.log(obj[prop]);

// functions and arrays 
var arr = []; // contains any thing even function

arr.push(function() {
    console.log('Hello world 1');
});

arr.push(function() {
    console.log('Hello world 2');
});

arr.push(function() {
    console.log('Hello world 3');
});

arr.forEach(function(item) { // using foreach function where a function takes the previous
    item();                  // 'functions'(array's) as input(item) then invokes them
});
