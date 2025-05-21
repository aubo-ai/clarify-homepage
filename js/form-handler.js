// Simple form handler for the Clarify template contact form
// This script replaces the Webflow form handling when running on a local server

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('email-form');
  const successMessage = document.querySelector('.w-form-done');
  const errorMessage = document.querySelector('.w-form-fail');
  
  if (contactForm) {
    // Change form method to POST for proper SMTP handling
    contactForm.setAttribute('method', 'post');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('field').value;
      
      // Simple validation
      if (!email) {
        showError('Please provide a valid email address.');
        return;
      }
      
      // Prepare form data for sending
      const formData = {
        name: name,
        email: email,
        message: message
      };
      
      // Send data to server-side handler
      sendFormData(formData);
    });
  }
  
  function sendFormData(formData) {
    // You can use fetch API to send data to a backend handler
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        showSuccess();
        contactForm.reset();
      } else {
        showError('There was a problem submitting your form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      showError('There was a problem connecting to the server. Please try again later.');
    });
  }
  
  function showSuccess() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }
  
  function showError(message) {
    errorMessage.querySelector('div').textContent = message || 'Oops! Something went wrong while submitting the form.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  }
});