// lists/models/List.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    customProperties: [{
        title: {
            type: String,
            required: true
        },
        fallbackValue: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('List', listSchema);
