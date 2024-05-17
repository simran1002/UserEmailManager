const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

// Endpoint: POST /lists/:listId/users/csv
router.post('/:listId/users/csv', upload.single('file'), userController.addUserFromCSV);

module.exports = router;
