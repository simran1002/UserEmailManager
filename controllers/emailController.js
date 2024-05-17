const List = require('../models/List');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

const sendEmailToList = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await List.findById(listId);
        if (!list) return res.status(404).json({ error: 'List not found' });

        const { subject, body } = req.body;
        const users = await User.find({ listId });
        const promises = users.map(async (user) => {
            const replacedBody = body.replace(/\[([^\]]+)\]/g, (match, property) => user.properties[property] || '');
            await sendEmail(user.email, subject, replacedBody);
        });

        await Promise.all(promises);
        res.status(200).json({ message: 'Email sent to all users in the list' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendEmailToList,
};
