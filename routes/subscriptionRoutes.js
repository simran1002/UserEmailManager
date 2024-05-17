const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Endpoint: POST /lists/:listId/users/:userId/unsubscribe
router.post('/:listId/users/:userId/unsubscribe', subscriptionController.unsubscribeUser);

module.exports = router;
