const nodemailer = require('nodemailer')

// Function to send confirmation email
const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {rejectUnauthorized: false}
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })

        // For debugging
        console.log('Email sent successfully')
    } catch (error) {

        // For debugging
        console.log("Email not sent")
        console.log(error)
    }
}

module.exports = sendEmail
