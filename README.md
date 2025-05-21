# Clarify Template

A clean and professional website template for agencies and consultants, designed to help businesses connect with their audiences through strategic communication.

## Contact Form Setup

The template includes a contact form that can be integrated with your SMTP server for processing submissions.

### Prerequisites

- Node.js and npm installed
- SMTP server details for sending emails

### Installation

1. Install the required dependencies:

```bash
npm install express body-parser nodemailer
```

2. Add the form handling script to your HTML:

```html
<!-- Add this before the closing </body> tag -->
<script src="js/form-handler.js"></script>
```

### Configuration

1. Open `server.js` and update the SMTP configuration with your email server details:

```javascript
// Update these settings with your SMTP server details
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com',     // Replace with your SMTP server
  port: 587,                        // Common SMTP port, adjust if needed
  secure: false,                    // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // SMTP username
    pass: 'your-password'           // SMTP password
  }
});

// Update recipient email address
const mailOptions = {
  from: 'your-email@example.com',
  to: 'recipient@example.com',      // Where to receive form submissions
  // ...
};
```

### Running the Server

Start the Node.js server to handle form submissions:

```bash
node server.js
```

This will start a local server on port 3000 that will:
1. Serve your static website files
2. Process form submissions via the `/submit-form` endpoint
3. Send email notifications using your SMTP server

### How It Works

The contact form submission flow:

1. When a user submits the form, the client-side JavaScript (`form-handler.js`) captures the form data
2. The data is sent via AJAX to the server's `/submit-form` endpoint
3. The server processes the request and sends an email using Nodemailer
4. Success/error messages are displayed to the user

## Customization

You can customize the contact form appearance and behavior:

- Edit the form fields in `index.html`
- Modify validation rules in `js/form-handler.js`
- Change email template formatting in `server.js`

## Security Considerations

- Never expose your SMTP credentials in client-side code
- Consider implementing rate limiting to prevent abuse
- For production use, make sure to use HTTPS
- Validate and sanitize all form inputs on the server-side

## License

See the [LICENSE](info/licenses.html) file for licensing information.