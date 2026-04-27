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

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const slideInterval = 6000;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
  }

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight * 0.85) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonial Slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonialDots = document.querySelectorAll('.slider-dots .dot');
  const prevTestimonialBtn = document.getElementById('prev-testimonial');
  const nextTestimonialBtn = document.getElementById('next-testimonial');
  
  if (testimonialSlider && testimonialDots.length > 0) {
    let currentTestimonial = 0;
    const totalTestimonials = testimonialDots.length;

    function updateTestimonialSlide() {
      testimonialSlider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
      testimonialDots.forEach(dot => dot.classList.remove('active'));
      testimonialDots[currentTestimonial].classList.add('active');
    }

    if (prevTestimonialBtn && nextTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialSlide();
      });

      nextTestimonialBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialSlide();
      });
    }

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        updateTestimonialSlide();
      });
    });

    // Auto-slide every 8 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      updateTestimonialSlide();
    }, 8000);
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      });
    });
  }
});
