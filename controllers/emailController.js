require("dotenv").config(); // Corrected the method call

const List = require('../models/List');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Importing the smtpTransport from nodemailer directly
const smtpTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendEmailToAllUsers = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const users = await User.find({ list: listId });
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found for the specified list' });
        }

        for (const user of users) {
            const { name, email, city } = user;
            const emailBody = generateEmail(name, email, city);

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: subject,
                text: emailBody
            };

            smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + response.message);
                }
            });
        }

        res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', details: error });
    }
};

const generateEmail = (name, email, city) => {
    const emailTemplate = `
        Hey ${name}!
        
        Thank you for signing up with your email ${email}. We have received your city as ${city}.
        
        Team MathonGo.
    `;

    return emailTemplate;
};

module.exports = {
    sendEmailToAllUsers
};
