const nodemailer = require('nodemailer');

const toEmail = async (recipient, subject, emailBody) => {

    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'kevinroirigorbasina@gmail.com',
            pass: process.env.GMAILPW
        }
    });

    const mailOptions = {
        subject: subject,
        to: recipient,
        from: 'YelpCamp-Team-NOREPLY@gmail.com',
        text: emailBody
    }

    await smtpTransport.sendMail(mailOptions);

}

module.exports = toEmail;