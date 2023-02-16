const nodemailer = require('nodemailer');
const path = require('path');

export const sendEmail = (details:any) => {
    try {
        const fromEmail = process.env.EMAIL_USERNAME
        let mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 250,
            secure: false,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailDetails = {
            from: fromEmail,
            to: details.email,
            subject: details.subject,
            text: details.template || 'content',
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs: ', err);
            }
        });
    } catch (error) {
        console.log('error', error);
    }
}