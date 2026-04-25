import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    /*
    // Use Brevo (Sendinblue)
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
    */
    
    // ✅ Use Gmail (Since you provided EMAIL_USER and EMAIL_PASS for Gmail)
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Your Google App Password: lxsykzrprquwtjel
    }
})

export default transporter;
