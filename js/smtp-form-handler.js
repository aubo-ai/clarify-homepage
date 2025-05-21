// SMTP Form Handler for the contact form
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('field').value;
      
      // Basic validation
      if (!name || !email || !message) {
        showError('Please fill in all fields.');
        return;
      }
      
      if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
      }
      
      // Show loading state
      const submitButton = document.querySelector('.submit-button-wrapper');
      submitButton.classList.add('loading');
      
      // Send email using Email.js library
      emailjs.send('service_id', 'template_id', {
        from_name: name,
        reply_to: email,
        message: message
      })
      .then(function(response) {
        // Success
        submitButton.classList.remove('loading');
        showSuccess();
        contactForm.reset();
      })
      .catch(function(error) {
        // Error
        submitButton.classList.remove('loading');
        console.error('Email sending failed:', error);
        showError('Failed to send your message. Please try again later.');
      });
    });
  }
  
  // Helper functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showSuccess() {
    const successMessage = document.querySelector('.w-form-done');
    const errorMessage = document.querySelector('.w-form-fail');
    const form = document.getElementById('email-form');
    
    if (successMessage && errorMessage && form) {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      form.style.display = 'none';
      
      // Reset after 5 seconds
      setTimeout(function() {
        successMessage.style.display = 'none';
        form.style.display = 'block';
      }, 5000);
    }
  }
  
  function showError(message) {
    const errorMessage = document.querySelector('.w-form-fail');
    const successMessage = document.querySelector('.w-form-done');
    
    if (errorMessage && successMessage) {
      if (message) {
        errorMessage.querySelector('div').textContent = message;
      }
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      
      // Hide after 5 seconds
      setTimeout(function() {
        errorMessage.style.display = 'none';
      }, 5000);
    }
  }
});