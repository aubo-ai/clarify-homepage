#!/usr/bin/env node

// Script to update EmailJS configuration
// Usage: node update-emailjs-config.js YOUR_USER_ID YOUR_SERVICE_ID YOUR_TEMPLATE_ID

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log('Usage: node update-emailjs-config.js YOUR_USER_ID YOUR_SERVICE_ID YOUR_TEMPLATE_ID');
  console.log('\nExample:');
  console.log('node update-emailjs-config.js "abc123" "service_gmail" "template_contact"');
  process.exit(1);
}

const [userId, serviceId, templateId] = args;

// Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  /publicKey: ".*?"/,
  `publicKey: "${userId}"`
);
fs.writeFileSync(indexPath, indexContent);
console.log('✓ Updated index.html with new User ID');

// Update smtp-form-handler.js
const jsPath = path.join(__dirname, 'js', 'smtp-form-handler.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');
jsContent = jsContent.replace(
  /emailjs\.send\('.*?', '.*?',/,
  `emailjs.send('${serviceId}', '${templateId}',`
);
fs.writeFileSync(jsPath, jsContent);
console.log('✓ Updated smtp-form-handler.js with new Service ID and Template ID');

console.log('\n✅ EmailJS configuration updated successfully!');
console.log('\nYour configuration:');
console.log(`- User ID: ${userId}`);
console.log(`- Service ID: ${serviceId}`);
console.log(`- Template ID: ${templateId}`);
console.log('\nMake sure to test the contact form to verify it works correctly.');