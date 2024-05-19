// config/rabbitmq.js
const amqp = require('amqplib');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        console.log('RabbitMQ connected');
        return channel;
    } catch (error) {
        console.error('RabbitMQ connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectRabbitMQ;
