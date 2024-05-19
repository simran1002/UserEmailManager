// lists/routes/listRoutes.js
const express = require('express');
const router = express.Router();
const { createList } = require('../controllers/listController');

// POST /lists
router.post('/', createList);

module.exports = router;
