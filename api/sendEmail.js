import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, phone, email, subject, message } = req.body;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,  // Use environment variable
                    pass: process.env.GMAIL_PASS     // Use environment variable
                }
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,  // Use environment variable
                to: process.env.GMAIL_USER,      // Send to the same user or another
                subject: 'New Inquiry for Mausam Studio',
                html: `<table style="padding: 10px;">
                        <tr><th style="text-align: start;">Name:</th><td>${name}</td></tr>
                        <tr><th style="text-align: start;">Mobile:</th><td>${phone}</td></tr>
                        <tr><th style="text-align: start;">Email:</th><td>${email}</td></tr>
                        <tr><th style="text-align: start;">Subject:</th><td>${subject}</td></tr>
                        <tr><th style="text-align: start;">Message:</th><td>${message.replace(/\n/g, '<br>')}</td></tr>
                    </table>`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Thank you! Your message has been sent.' });
        } catch (error) {
            console.error('Email sending failed:', error);
            res.status(500).json({ message: `Oops! Something went wrong: ${error.message}` });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
