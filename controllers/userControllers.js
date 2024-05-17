const fs = require('fs');
const csvParser = require('csv-parser');
const List = require('../models/List');
const User = require('../models/User');

const addUserFromCSV = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await List.findById(listId);
        if (!list) return res.status(404).json({ error: 'List not found' });

        const users = [];
        const errors = [];

        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', async (row) => {
                try {
                    const { name, email, ...properties } = row;
                    if (!name || !email) throw new Error('Name and email are required');
                    
                    const existingUser = await User.findOne({ email, listId });
                    if (existingUser) throw new Error(`User with email ${email} already exists in the list`);

                    const user = new User({ name, email, properties, listId });
                    await user.save();
                    users.push(user);
                } catch (error) {
                    errors.push({ row, error: error.message });
                }
            })
            .on('end', async () => {
                fs.unlinkSync(req.file.path);
                const totalCount = await User.countDocuments({ listId });
                res.status(200).json({ successCount: users.length, errorCount: errors.length, errors, totalCount });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUserFromCSV,
};
