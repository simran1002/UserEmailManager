const List = require('../models/List');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const smtpTransport = require('../config/nodemailerConfig');

const sendEmailToAllUsers = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;

    try {
        // Retrieve the list from the database
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        // Retrieve all users belonging to the specified list
        const users = await User.find({ listId });

        // Extract email addresses of all users
        const emails = users.map(user => user.email);

        // Extract placeholders from the email body
        const placeholders = Object.keys(users[0].properties); // Assuming all users have same custom properties

        // Iterate over each user and send email
        for (const email of emails) {
            let processedEmailBody = body;

            // Replace placeholders with actual property values
            for (const placeholder of placeholders) {
                const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
                processedEmailBody = processedEmailBody.replace(regex, users.find(user => user.email === email).properties[placeholder]);
            }

            // Configure email options
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: subject,
                text: processedEmailBody
            };

            // Send email using SMTP transport
            smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Email sent: ' + response.message);
                }
            });
        }

        // Respond with success message
        res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        // Handle server errors
        console.error(error);
        res.status(500).json({ error: 'Server error', details: error });
    }
};

module.exports = {
    sendEmailToAllUsers
};
