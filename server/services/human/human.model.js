const mongoose = require('mongoose');

const humanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    dateRegistered:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Human', humanSchema);