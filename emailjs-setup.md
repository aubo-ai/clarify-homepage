# EmailJS Setup Instructions

To make the contact form work, you need to set up your own EmailJS account and configure it properly.

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account

## Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Set up your template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{reply_to}}` - Sender's email
   - `{{message}}` - Message content

Example template:
```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{reply_to}}

Message:
{{message}}
```

4. Save and note down your **Template ID**

## Step 4: Get Your User ID
1. Go to "Integration" section
2. Copy your **User ID** (Public Key)

## Step 5: Update Your Code

### Option 1: Update index.html
Replace line 31 in index.html:
```javascript
emailjs.init("YOUR_USER_ID_HERE");
```

### Option 2: Update smtp-form-handler.js
Replace line 29 in js/smtp-form-handler.js:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

## Environment Variables (Recommended)
For security, consider using environment variables instead of hardcoding credentials:

1. Create a `.env` file (add to .gitignore)
2. Add your credentials:
```
EMAILJS_USER_ID=your_user_id
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

## Testing
1. Open your website
2. Fill out the contact form
3. Submit and check if you receive the email
4. Check browser console for any errors

## Troubleshooting
- Make sure all IDs are correct
- Check EmailJS dashboard for failed emails
- Verify your email service is active
- Check browser console for errors