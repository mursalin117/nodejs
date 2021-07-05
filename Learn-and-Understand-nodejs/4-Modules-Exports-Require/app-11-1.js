var greet = require('./greet-11-1');
greet();

var greet2a = require('./greet-11-2');
greet2a.greet();

var greet2b = require('./greet-11-2').greet;
greet2b();

var greet3a = require('./greet-11-3');
greet3a.greet();
greet3a.greeting = 'Changed Hello world';

var greet3b = require('./greet-11-3');
greet3b.greet();

var Greet4 = require('./greet-11-4');
var grtr = new Greet4();
grtr.greet();

var greet5 = require('./greet-11-5');
greet5.greet();