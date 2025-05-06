function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const toggle = document.querySelector(".menu-toggle");

    toggle.classList.toggle("open");
    if (menu.style.display === "flex") {
      gsap.to(menu, { opacity: 0, y: -20, duration: 0.3, onComplete: () => menu.style.display = "none" });
    } else {
      menu.style.display = "flex";
      gsap.fromTo(menu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }

  gsap.from("header", {
    y: -100,
    scale:0,
    opacity: 0,
    duration: 1.7,
    ease: "power4.out"
  });

  gsap.from(".tagline", {
    xPercent: -50,
    opacity: 0,
    duration: 1,
    delay: 0.4
  });
  
  gsap.from(".headline", {
    xPercent: -50,
    opacity: 0,
    duration: 1,
    delay: 0.4
  });
  
  gsap.from(".subtext", {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.6
  });
  
  gsap.from(".cta-button", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay: 0.8
  });
  gsap.from(".photo-gallery", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay: 1
  });

  // Horizontal Gallery Animations
  gsap.utils.toArray('.photo-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: '.gallery-container',
        start: "left 80%",
        end: "right 20%",
        toggleActions: "play none none none",
        horizontal: true,
        scrub: 0.5
      },
      x: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out"
    });
  });

  // Parallax effect on hover
  document.querySelectorAll('.photo-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const x = e.clientX - item.getBoundingClientRect().left;
      const y = e.clientY - item.getBoundingClientRect().top;
      gsap.to(item, {
        x: (x - item.offsetWidth/2) * 0.1,
        y: (y - item.offsetHeight/2) * 0.1,
        duration: 0.5
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.5
      });
    });
  });

  document.querySelectorAll('nav a').forEach(link => {
    
    if (link.getAttribute('id') !='ch'){
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if(targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    }
    
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
