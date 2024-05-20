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

connectDB();

// connectRabbitMQ();

app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);
app.use('/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
