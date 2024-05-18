const mongoose = require('mongoose');
const { mongoURI } = require('./config'); // Import MongoDB URI from config

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;
