// lists/controllers/listController.js
const List = require('../models/List');

const createList = async (req, res) => {
    try {
        const newList = new List(req.body);
        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createList };
