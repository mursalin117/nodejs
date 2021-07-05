function Emitter() {
    this.events = {};
}

Emitter.prototype.on = function(type, listener) { // adding properties
    this.events[type] = this.events[type] || [];  // creating new array for the event-type
    this.events[type].push(listener);   // pushing the function to the array 
}

Emitter.prototype.emit = function(type) { // adding another property
    if(this.events[type]) { // if the event is true execute the function
        this.events[type].forEach(function(listener) {
            listener(); 
        });
    }
}

module.exports = Emitter;