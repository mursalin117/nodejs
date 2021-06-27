const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name: String,
    ID: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
