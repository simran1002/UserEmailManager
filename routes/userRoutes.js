const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/lists', userController.createList);
router.post('/lists/:listId/users', upload.single('file'), userController.addUserFromCSV);

// Additional routes for sending email, unsubscribing, etc.

module.exports = router;
