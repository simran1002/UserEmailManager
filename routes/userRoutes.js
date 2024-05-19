const express = require('express');
const router = express.Router();
const { addUsers } = require('../controllers/userController'); // Correct import statement
// const multer = require('multer');
// // Route for uploading CSV file
// router.post('/:listId', uploadCSV); // Assign the uploadCSV function as the callback for the route

// const upload = multer({ dest: 'uploads/' });

// Endpoint: POST /lists/:listId/users
router.post('/:listId',addUsers);


module.exports = router;
