const User = require('../models/User');
const List = require('../models/List');

const unsubscribeUser = async (req, res) => {
    try {
        const { listId, userId } = req.params;
        const user = await User.findOneAndUpdate({ _id: userId, list: listId }, { subscribed: false }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found in the list' });

        res.status(200).json({ message: 'User unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    unsubscribeUser,
};
