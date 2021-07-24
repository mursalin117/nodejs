const mongoose = require('mongoose');

const mySchema = mongoose.Schema({
    img: { type: String, required: true },
    note: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    user_id: { type: String, required: true },
    isAdmin: String,
    approval: String,
    isAuthorized: String,
    status: String 
}, {
    timestamps: true
});

module.exports = mongoose.model("Info", mySchema);