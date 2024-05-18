require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./dbConfig'); // Import the MongoDB connection function

// Import routes
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/lists', listRoutes);
app.use('/lists', userRoutes);
app.use('/lists', emailRoutes);
app.use('/lists', subscriptionRoutes);

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
