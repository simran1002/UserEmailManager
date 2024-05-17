const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Endpoint: POST /lists
router.post('/', listController.createList);

module.exports = router;
