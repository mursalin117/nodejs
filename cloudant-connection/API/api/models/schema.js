const mongoose = require('mongoose');

const mySchema = mongoose.Schema({
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
        weight: { type: Number, required: true}
    }
});

module.exports = mongoose.model("Info", mySchema);
