// Add this JavaScript to your global scripts

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('legalModal');
  const modalClose = document.querySelector('.modal-close');
  const modalAccept = document.querySelector('.modal-accept');
  const modalNavItems = document.querySelectorAll('.modal-nav-item');
  const modalSections = document.querySelectorAll('.modal-section-content');
  const footerLinks = document.querySelectorAll('.footer-bottom-links a, .sitemap-list a.modal-link');
  
  // Open modal when clicking footer legal links
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the section from link text or data attribute
      let section = '';
      const linkText = this.textContent.toLowerCase().trim();
      
      if (linkText.includes('terms')) section = 'terms';
      else if (linkText.includes('privacy')) section = 'privacy';
      else if (linkText.includes('cookies') || linkText.includes('cookie')) section = 'cookies';
      else if (linkText.includes('sitemap')) section = 'sitemap';
      else if (this.dataset.section) section = this.dataset.section;
      
      // Open modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Activate corresponding section
      if (section) {
        activateModalSection(section);
      }
    });
  });
  
  // Function to activate modal section
  function activateModalSection(sectionId) {
    // Update nav items
    modalNavItems.forEach(item => {
      if (item.dataset.section === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update content sections
    modalSections.forEach(section => {
      if (section.id === `${sectionId}-content`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }
  
  // Modal nav item click
  modalNavItems.forEach(item => {
    item.addEventListener('click', function() {
      const sectionId = this.dataset.section;
      activateModalSection(sectionId);
    });
  });
  
  // Close modal functions
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  modalAccept.addEventListener('click', closeModal);
  
  // Close on overlay click
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Initially activate terms section
  activateModalSection('terms');
});

// ============================================
// NETCON GLOBAL JAVASCRIPT
// Mobile Navigation, Sticky Header, and Modal functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE NAVIGATION MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const nav = document.querySelector('nav');
  
  if (menuToggle && navLinks) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars', 'fa-th');
        icon.classList.add('fa-times');
        menuToggle.setAttribute('aria-label', 'Close menu');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        menuToggle.setAttribute('aria-label', 'Open menu');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        menuToggle.setAttribute('aria-label', 'Open menu');
      }
    });
    
    // Close menu when clicking on a link (for single page navigation)
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
    
    // Handle window resize - reset menu state on larger screens
    window.addEventListener('resize', function() {
      if (window.innerWidth > 950) {
        navLinks.classList.remove('active');
        if (menuToggle.querySelector('i')) {
          menuToggle.querySelector('i').classList.remove('fa-times');
          menuToggle.querySelector('i').classList.add('fa-bars');
        }
      }
    });
  }
  
  // ===== STICKY HEADER WITH SCROLL EFFECT =====
  function handleStickyHeader() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  
  // Initial check
  handleStickyHeader();
  
  // Check on scroll
  window.addEventListener('scroll', handleStickyHeader);
  
  
// ===== ACTIVE PAGE HIGHLIGHTING - COMPLETE WORKING VERSION =====
function highlightActivePage() {
  // Get current page filename
  let currentUrl = window.location.pathname;
  let currentPage = currentUrl.split('/').pop();
  
  // Handle root/index
  if (!currentPage || currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }
  
  // Remove any query parameters or hash
  currentPage = currentPage.split('?')[0].split('#')[0];
  
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    // Remove existing active class
    link.classList.remove('active');
    
    // Get link href and clean it
    let linkHref = link.getAttribute('href');
    let linkPage = linkHref.split('/').pop().split('?')[0].split('#')[0];
    
    // Compare
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
    
    // Special case for index
    if (currentPage === 'index.html' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', highlightActivePage);

// Run after everything loads (catch any late changes)
window.addEventListener('load', highlightActivePage);
  
  // ===== MODAL FUNCTIONALITY (if modal exists on page) =====
  const modalOverlay = document.getElementById('legalModal');
  
  if (modalOverlay) {
    const modalClose = document.querySelector('.modal-close');
    const modalAccept = document.querySelector('.modal-accept');
    const modalNavItems = document.querySelectorAll('.modal-nav-item');
    const modalSections = document.querySelectorAll('.modal-section-content');
    const footerLinks = document.querySelectorAll('.footer-bottom-links a, .sitemap-list a.modal-link');
    
    // Function to activate modal section
    function activateModalSection(sectionId) {
      // Update nav items
      modalNavItems.forEach(item => {
        if (item.dataset.section === sectionId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // Update content sections
      modalSections.forEach(section => {
        if (section.id === `${sectionId}-content`) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    }
    
    // Open modal when clicking footer legal links
    footerLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the section from link text or data attribute
        let section = '';
        const linkText = this.textContent.toLowerCase().trim();
        
        if (linkText.includes('terms')) section = 'terms';
        else if (linkText.includes('privacy')) section = 'privacy';
        else if (linkText.includes('cookies') || linkText.includes('cookie')) section = 'cookies';
        else if (linkText.includes('sitemap')) section = 'sitemap';
        else if (this.dataset.section) section = this.dataset.section;
        
        // Open modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Activate corresponding section
        if (section) {
          activateModalSection(section);
        }
      });
    });
    
    // Modal nav item click
    modalNavItems.forEach(item => {
      item.addEventListener('click', function() {
        const sectionId = this.dataset.section;
        activateModalSection(sectionId);
      });
    });
    
    // Close modal functions
    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalAccept) modalAccept.addEventListener('click', closeModal);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
    
    // Initially activate terms section
    if (modalNavItems.length > 0) {
      activateModalSection('terms');
    }
  }
  
  // ===== DROPDOWN MENU FOR MOBILE (if you have dropdowns) =====
  // Optional: Add this if you have dropdown submenus
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 950) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle('show');
        
        // Rotate arrow icon
        const icon = this.querySelector('i.fa-chevron-down');
        if (icon) {
          icon.classList.toggle('rotate');
        }
      }
    });
  });
  
});

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Add this JavaScript to handle AJAX submission //

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get the submit button
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> sending...';
      submitBtn.disabled = true;
      
      // Collect form data
      const formData = new FormData(contactForm);
      
      // Send to Formspree using fetch API
      fetch('https://formspree.io/f/xeergagw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Success - redirect to your custom thank you page
          window.location.href = 'thank-you.html';
        } else {
          // Error from Formspree
          return response.json().then(data => {
            throw new Error(data.error || 'Form submission failed');
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        const feedback = document.getElementById('formFeedback') || document.createElement('div');
        feedback.id = 'formFeedback';
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Failed to send. Please try again or email us directly at hello@netcon.io';
        
        // Insert feedback if not exists
        if (!document.getElementById('formFeedback')) {
          contactForm.appendChild(feedback);
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }
});