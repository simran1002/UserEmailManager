const express = require('express');
const router = express.Router();
const { addUsers } = require('../controllers/userController');

router.post('/:listId',addUsers);

module.exports = router;
