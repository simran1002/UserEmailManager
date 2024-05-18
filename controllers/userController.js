const List = require('../models/List');
const User = require('../models/User');
const csvParser = require('csv-parser');
const fs = require('fs');

const addUsers = async (req, res) => {
    const { listId } = req.params;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'CSV file is required' });
    }

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const customProperties = list.customProperties.reduce((acc, prop) => {
            acc[prop.title] = prop.fallbackValue;
            return acc;
        }, {});

        const users = [];
        const errors = [];

        fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                const user = {
                    name: row.name,
                    email: row.email,
                    listId: listId,
                    properties: {}
                };

                if (!user.name || !user.email) {
                    errors.push({ row, error: 'Name and email are required' });
                    return;
                }

                for (const [key, fallbackValue] of Object.entries(customProperties)) {
                    user.properties[key] = row[key] || fallbackValue;
                }

                users.push(user);
            })
            .on('end', async () => {
                try {
                    const result = await User.insertMany(users, { ordered: false });
                    res.status(200).json({
                        success: true,
                        addedCount: result.length,
                        errorsCount: errors.length,
                        errorsList: errors,
                    });
                } catch (error) {
                    res.status(500).json({ error: 'Server error', details: error });
                }
            });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error });
    }
};

module.exports = {
    addUsers,
};
