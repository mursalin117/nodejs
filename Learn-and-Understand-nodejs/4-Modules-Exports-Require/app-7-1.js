var firstname = 'Jane';

// anonymous function can be executed by expression- to do that use ()
(function(lastname) {
    
    var firstname = 'John';
    console.log(firstname);
    console.log(lastname);

// immediately invoke/call    
}('Doe'));

console.log(firstname);