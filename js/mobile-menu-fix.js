// Fix for mobile menu not closing after clicking Contáctanos
document.addEventListener('DOMContentLoaded', function() {
  // Find the mobile menu button inside nav-menu
  const mobileContactButton = document.querySelector('.nav-menu .nav-menu-button');
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileContactButton && menuButton) {
    mobileContactButton.addEventListener('click', function() {
      // Close the mobile menu by removing the open class
      if (navMenu && navMenu.classList.contains('w--open')) {
        navMenu.classList.remove('w--open');
      }
      
      // Also trigger click on menu button to ensure proper state
      if (menuButton.classList.contains('w--open')) {
        menuButton.click();
      }
    });
  }
  
  // Also handle all nav links in mobile menu
  const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link-wrap');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu && navMenu.classList.contains('w--open')) {
        navMenu.classList.remove('w--open');
      }
      if (menuButton && menuButton.classList.contains('w--open')) {
        menuButton.click();
      }
    });
  });
});