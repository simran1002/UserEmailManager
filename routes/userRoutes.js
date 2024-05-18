const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

// Endpoint: POST /lists/:listId/users
router.post('/:listId', upload.single('file'), userController.addUsers);

module.exports = router;
