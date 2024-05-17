const express = require('express');
const app = express();

// Import routes
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/lists', listRoutes);
app.use('/lists', userRoutes);
app.use('/lists', emailRoutes);
app.use('/lists', subscriptionRoutes);

module.exports = app;
