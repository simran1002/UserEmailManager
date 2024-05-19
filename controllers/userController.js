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

        // const customPropertiesMap = new Map(list.customProperties.map(property => [property.title.toLowerCase(), property.fallbackValue]));

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

// fs.createReadStream(file.path)
        //     .pipe(csvParser())
        //     .on('data', (row) => {
        //         const user = {
        //             listId: listId,
        //             properties: {}
        //         };

        //         // Iterate through custom properties and map data from CSV
        //         list.customProperties.forEach(property => {
        //             const propertyName = property.title.toLowerCase();
        //             user.properties[propertyName] = row[propertyName] || customPropertiesMap.get(propertyName);
        //         });

        //         users.push(user);
        //     })
        //     .on('end', async () => {
        //         try {
        //             const result = await User.insertMany(users, { ordered: false });
        //             res.status(200).json({
        //                 success: true,
        //                 addedCount: result.length,
        //                 errorsCount: errors.length,
        //                 errorsList: errors,
        //             });
        //         } catch (error) {
        //             res.status(500).json({ error: 'Server error', details: error });
        //         }
        //     });