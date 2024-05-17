const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Endpoint: POST /lists/:listId/send-email
router.post('/:listId/send-email', emailController.sendEmailToList);

module.exports = router;
