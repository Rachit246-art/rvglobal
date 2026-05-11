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
  // Chatbot Toggle Logic
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');

  if (chatbotToggle && chatbotContainer) {
    chatbotToggle.addEventListener('click', (e) => {
      e.preventDefault();
      chatbotContainer.classList.toggle('active');
    });

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
      });
    }

    // Options-based Chatbot Logic
    const chatOptions = document.getElementById('chat-options');
    const chatMessages = document.getElementById('chat-messages');
    const chatBody = chatbotContainer.querySelector('.chatbot-body');

    const chatData = {
      start: {
        message: "Welcome to RV Global Aviation. How may we assist your international travel plans today?",
        options: [
          { text: "Private Jet Charter", next: "jet_charter" },
          { text: "Medical Evacuation", next: "medical" },
          { text: "Group Charter", next: "group" },
          { text: "Speak to Expert", next: "expert" }
        ]
      },
      jet_charter: {
        message: "Excellent choice. What type of journey are you planning?",
        options: [
          { text: "International Trip", next: "contact_final" },
          { text: "Domestic Flight", next: "contact_final" },
          { text: "Multi-city Tour", next: "contact_final" },
          { text: "Back", next: "start" }
        ]
      },
      medical: {
        message: "Medical flights are our priority. Do you require ICU equipment onboard?",
        options: [
          { text: "Yes, ICU Required", next: "contact_final" },
          { text: "No, Patient Transport", next: "contact_final" },
          { text: "Back", next: "start" }
        ]
      },
      group: {
        message: "For how many passengers are you planning the charter?",
        options: [
          { text: "15-30 Passengers", next: "contact_final" },
          { text: "30+ Passengers", next: "contact_final" },
          { text: "Back", next: "start" }
        ]
      },
      expert: {
        message: "A senior aviation consultant is ready to assist you. How would you like to connect?",
        options: [
          { text: "Call Now", next: "call" },
          { text: "WhatsApp Chat", next: "whatsapp" },
          { text: "Back", next: "start" }
        ]
      },
      contact_final: {
        message: "Thank you. Please leave your contact details or call us directly at +91 98765 43210 for an instant quote.",
        options: [
          { text: "Call Now", next: "call" },
          { text: "Start Over", next: "start" }
        ]
      },
      call: { message: "Redirecting to call...", action: () => window.location.href = "tel:+919876543210" },
      whatsapp: { message: "Opening WhatsApp...", action: () => window.open("https://wa.me/919876543210", "_blank") }
    };

    function showStep(stepId) {
      const step = chatData[stepId];
      if (!step) return;

      if (step.action) {
        step.action();
        return;
      }

      // Add Bot Message
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = `<p>${step.message}</p>`;
      chatMessages.appendChild(botMsg);

      // Clear old options
      chatOptions.innerHTML = '';

      // Add new options
      step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => {
          // Add User Message (Selection)
          const userMsg = document.createElement('div');
          userMsg.className = 'chat-message user';
          userMsg.innerHTML = `<p>${opt.text}</p>`;
          chatMessages.appendChild(userMsg);
          
          chatBody.scrollTop = chatBody.scrollHeight;
          
          setTimeout(() => showStep(opt.next), 500);
        };
        chatOptions.appendChild(btn);
      });

      chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Initialize the first step
    showStep('start');
  }
});
