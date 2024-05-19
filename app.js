// require('dotenv').config();
// const express = require('express');
// const app = express();
// const connectDB = require('./config/dbConfig'); // Import the MongoDB connection function

// // Import routes
// const listRoutes = require('./routes/listRoutes');
// const userRoutes = require('./routes/userRoutes');
// const emailRoutes = require('./routes/emailRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');

// // Middleware
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/lists', listRoutes);
// app.use('/lists', userRoutes);
// app.use('/lists', emailRoutes);
// app.use('/lists', subscriptionRoutes);

// // Define port
// const PORT = process.env.PORT || 3000;

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// app.js

const express = require('express');
const connectDB = require('./config/dbConfig');
const connectRabbitMQ = require('./config/rabbitmq');
const fileUpload = require('express-fileupload');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();

// Routes
app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);
app.use('/subscriptions', subscriptionRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
