const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


const transporter = nodemailer.createTransport("SMTP", {
    service: 'gmail', // Or your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log("transporter smtp configured");


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


async function sendOTP(email, otp) {
    try {
        const mailOptions = {
            from: {
                name: 'Vaibhav Aggarwal',
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: 'OTP for Account Verification',
            text: `Your OTP is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.log("errrror is: ", err);
    }
}

module.exports = { generateOTP, sendOTP };