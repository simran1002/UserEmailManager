const express = require('express');
const router = express.Router();
const { sendEmailToAllUsers } = require('../controllers/emailController');

router.post('/:listId/send-email', sendEmailToAllUsers);

module.exports = router;
