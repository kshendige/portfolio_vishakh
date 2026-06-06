/**
 * Vishakh Vittal Shendige - Personal Brand Website Logic
 * Boardroom-grade interactions, scroll animations, and dynamic state management.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Navigation Menu Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  
  if (mobileNavToggle && navbarLinks) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navbarLinks.classList.toggle('open');
      mobileNavToggle.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when clicking a menu link
    const links = navbarLinks.querySelectorAll('.navbar-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('open');
        mobileNavToggle.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Tab Control Logic (Section 5: AI Tools I Teach)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('aria-controls');

      // Update button active state
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update content active state
      tabContents.forEach(content => {
        if (content.id === targetTabId) {
          content.classList.add('active');
          
          // Re-trigger reveal animations on active tab tools
          const toolCards = content.querySelectorAll('.tool-card');
          toolCards.forEach((card, idx) => {
            card.style.setProperty('--stagger-index', idx);
            card.classList.add('visible');
          });
        } else {
          content.classList.remove('active');
        }
      });
    });

    // Support keyboard navigation (left/right arrow keys) for tabs
    button.addEventListener('keydown', (e) => {
      const parentList = button.parentElement;
      const buttonsArray = Array.from(parentList.querySelectorAll('.tab-btn'));
      const index = buttonsArray.indexOf(button);
      
      let nextButton = null;
      if (e.key === 'ArrowRight') {
        nextButton = buttonsArray[(index + 1) % buttonsArray.length];
      } else if (e.key === 'ArrowLeft') {
        nextButton = buttonsArray[(index - 1 + buttonsArray.length) % buttonsArray.length];
      }

      if (nextButton) {
        nextButton.focus();
        nextButton.click();
        e.preventDefault();
      }
    });
  });

  // 3. High-Performance Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('visible');
        
        // Handle staggered grid item lists automatically
        const staggerItems = target.querySelectorAll('.stagger-item');
        if (staggerItems.length > 0) {
          staggerItems.forEach((item, index) => {
            item.style.setProperty('--stagger-index', index);
            item.classList.add('visible');
          });
        }
        
        // Stop observing once animation triggered
        observer.unobserve(target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Sticky Navbar Active State Scroll Tracker
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger focus when section occupies center viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));
});
