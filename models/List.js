const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    customProperties: [{ title: String, fallbackValue: String }]
});

module.exports = mongoose.model('List', ListSchema);
