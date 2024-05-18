const List = require('../models/List');

const createList = async (req, res) => {
    const { title, customProperties } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newList = new List({
            title,
            customProperties
        });
        
        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createList
};
