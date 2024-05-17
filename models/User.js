const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    properties: { type: Map, of: String },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }
});

module.exports = mongoose.model('User', UserSchema);
