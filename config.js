require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGOURI,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASSWORD
};
