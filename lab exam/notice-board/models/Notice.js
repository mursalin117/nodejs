// importing mongoose
const mongoose = require('mongoose');

// creating notice-schema
const noticeSchema = mongoose.Schema({
    subject: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// export schema
module.exports = mongoose.model('board', noticeSchema);