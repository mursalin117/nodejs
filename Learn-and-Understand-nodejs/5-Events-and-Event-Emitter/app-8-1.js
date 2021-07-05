require('./jsconfig-8-1.json'); // use it like 'jsconfig.json'

var obj = {
    name: 'John Doe',
    greet: function() { // if the function has parameter
        console.log(`Hello ${ this.name }`);
    }
}

obj.greet();
obj.greet.call({ name: 'Jane Doe'}); // it passes the parameter as para1, para2, para3, ...
obj.greet.apply({ name: 'Don Doe'}); // it passes the parameter as [para1, para2, para3, ...]