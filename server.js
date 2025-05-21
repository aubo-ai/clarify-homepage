// Simple Node.js server with Express and Nodemailer for form handling
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create transporter (configure with your SMTP details)
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com', // Replace with your SMTP server
  port: 587,                    // Common SMTP port, adjust if needed
  secure: false,                // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // SMTP username
    pass: 'your-password'           // SMTP password
  }
});

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  
  // Email options
  const mailOptions = {
    from: 'your-email@example.com',    // Sender address
    to: 'recipient@example.com',       // List of receivers
    subject: `New contact form submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email' });
    }
    
    console.log('Message sent:', info.messageId);
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});