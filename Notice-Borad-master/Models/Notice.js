const mongoose = require('mongoose');

// create notice-schema
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


// export module
module.exports = mongoose.model('notices', noticeSchema);