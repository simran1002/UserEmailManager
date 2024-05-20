const express = require('express');
const router = express.Router();
const { unsubscribeUser } = require('../controllers/subscriptionController');

router.put('/lists/:listId/users/:userId/unsubscribe', unsubscribeUser);

module.exports = router;
