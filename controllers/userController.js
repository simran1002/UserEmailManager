const List = require('../models/List');
const User = require('../models/User');
const csvParser = require('csv-parser');
const {readCsv} = require("../utils/utils");
const fs = require('fs');

const addUsers = async (req, res) => {
    const { listId } = req.params;
    const file = req.files.file;

    if (!file) {
        return res.status(400).json({ error: 'CSV file is required' });
    }

    console.log(file);

    try {
        const list = await List.findById(listId);
        console.log(list);  
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        if (!list.customProperties || list.customProperties.length === 0) {
            return res.status(400).json({ error: 'Custom properties not defined for the list' });
        }

        const customPropertiesmap= new Map();
        for(const property of list.customProperties){
            customPropertiesmap.set(property.title.toLowerCase(),property.fallbackValue);
        }

        console.log(customPropertiesmap)


        const userData = await readCsv(file,customPropertiesmap,listId);

        console.log(userData);

        const saveData= await User.insertMany(userData);
        return res.status(200).json({
            success: true,
            addedCount: saveData.length,
            errorsCount: 0,
            errorsList: [],
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error });
    }
};

module.exports = {
    addUsers
};
