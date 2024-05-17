const List = require('../models/List');
const User = require('../models/User');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../config');

const createList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;
        const list = new List({ title, customProperties });
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUserFromCSV = async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
        return res.status(404).json({ error: 'List not found' });
    }

    const results = [];
    const errors = [];
    let totalCount = 0;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            fs.unlinkSync(req.file.path); // remove temp file

            for (const row of results) {
                const { name, email, ...props } = row;
                if (!name || !email) {
                    errors.push({ row, error: 'Missing required fields' });
                    continue;
                }

                const userProperties = {};
                list.customProperties.forEach((prop) => {
                    userProperties[prop.title] = props[prop.title] || prop.fallbackValue;
                });

                try {
                    const user = new User({ name, email, properties: userProperties, listId });
                    await user.save();
                    totalCount++;
                } catch (err) {
                    errors.push({ row, error: err.message });
                }
            }

            res.status(200).json({
                successCount: totalCount,
                errorCount: errors.length,
                errors,
                currentTotalCount: await User.countDocuments({ listId })
            });
        });
};

// Additional methods for sending email, unsubscribing, etc. go here.

module.exports = {
    createList,
    addUserFromCSV,
    // Other exports like sendEmail, unsubscribeUser, etc.
};
