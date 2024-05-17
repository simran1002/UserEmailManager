const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    auth: {
        user: config.smtpUser,
        pass: config.smtpPass
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: config.smtpUser,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};
