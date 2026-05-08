document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll (Intersection Observer for better performance)
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Menu Toggle logic
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
  }

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  // Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.exp-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('h4');
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxCaption.innerText = caption ? caption.innerText : '';
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Auto Lead Modal Trigger (Triggers at 3rd section - #services)
  const autoModal = document.getElementById('auto-lead-modal');
  const servicesSection = document.getElementById('services');
  const closeAutoModal = document.getElementById('close-auto-modal');
  let modalShown = false;

  if (autoModal && servicesSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only trigger if intersecting, not yet shown, AND user has actually scrolled (scrollY > 0)
        if (entry.isIntersecting && !modalShown && window.scrollY > 100) {
          setTimeout(() => {
            autoModal.classList.add('active');
            modalShown = true;
          }, 800); 
        }
      });
    }, { threshold: 0.1 }); 

    observer.observe(servicesSection);

    if (closeAutoModal) {
      closeAutoModal.addEventListener('click', () => {
        autoModal.classList.remove('active');
      });
    }

    autoModal.addEventListener('click', (e) => {
      if (e.target === autoModal) {
        autoModal.classList.remove('active');
      }
    });
  }
});
