// GSAP Animations
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});



// Initialize GSAP
document.addEventListener('DOMContentLoaded', function () {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');
    const menuBars = document.querySelectorAll('.menu-toggle span');

    // Initial state
    gsap.set(menuLinks, { y: 100, opacity: 0 });

    let menuOpen = false;

    menuToggle.addEventListener('click', function () {
        menuOpen = !menuOpen;

        if (menuOpen) {
            // Open the menu
            gsap.to(menuOverlay, {
                duration: 0.5,
                opacity: 1,
                visibility: 'visible',
                ease: 'power2.out'
            });

            // Animate the menu bars to form an X
            gsap.to(menuBars[0], {
                duration: 0.3,
                rotation: 45,
                y: 5,
                backgroundColor: 'var(--accent)'
            });

            gsap.to(menuBars[1], {
                duration: 0.3,
                rotation: -45,
                y: -5,
                backgroundColor: 'var(--accent)'
            });

            // Animate each link with staggered delay
            gsap.to(menuLinks, {
                duration: 0.6,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out'
            });
        } else {
            // Close the menu
            gsap.to(menuOverlay, {
                duration: 0.5,
                opacity: 0,
                visibility: 'hidden',
                ease: 'power2.in'
            });

            // Animate the menu bars back to normal
            gsap.to(menuBars, {
                duration: 0.3,
                rotation: 0,
                y: 0,
                backgroundColor: 'var(--secondary)'
            });

            // Animate links back down
            gsap.to(menuLinks, {
                duration: 0.3,
                y: 100,
                opacity: 0,
                stagger: 0.05,
                ease: 'power2.in'
            });
        }
    });

    // Add hover animations for menu links
    menuLinks.forEach(link => {
        const linkUnderline = link.querySelector('::after') || link;

        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.3,
                color: 'var(--accent)',
                ease: 'power1.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.3,
                color: 'var(--secondary)',
                ease: 'power1.out'
            });
        });
    });

    // Page transition animations
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const target = this.getAttribute('href');

            // First close the menu with a nice animation
            gsap.to(menuOverlay, {
                duration: 0.5,
                opacity: 0,
                visibility: 'hidden',
                ease: 'power2.in',
                onComplete: () => {
                    // Reset menu toggle state
                    menuOpen = false;
                    gsap.to(menuBars, {
                        duration: 0.3,
                        rotation: 0,
                        y: 0,
                        backgroundColor: 'var(--secondary)'
                    });

                    // Scroll to the section
                    const targetSection = document.querySelector(target);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });

            // Animate links back down
            gsap.to(menuLinks, {
                duration: 0.3,
                y: 100,
                opacity: 0,
                stagger: 0.05,
                ease: 'power2.in'
            });
        });
    });

    // Add scroll animations for the header
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add background to header when scrolling down
        if (currentScrollY > 50) {
            gsap.to(header, {
                duration: 0.3,
                backgroundColor: 'rgba(var(--primary-rgb), 0.9)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            });
        } else {
            gsap.to(header, {
                duration: 0.3,
                backgroundColor: 'transparent',
                boxShadow: 'none'
            });
        }

        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            gsap.to(header, {
                duration: 0.3,
                y: '-100%',
                ease: 'power3.out'
            });
        } else {
            // Scrolling up
            gsap.to(header, {
                duration: 0.3,
                y: '0%',
                ease: 'power3.out'
            });
        }

        lastScrollY = currentScrollY;
    });

    // Create a timeline for hero animations
    const heroTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // Select hero elements
    const heroTitle = document.querySelectorAll('.hero h1 span');
    const heroDesc = document.querySelector('.hero p');
    const ctaButton = document.querySelector('.cta-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Initial states
    gsap.set(heroTitle, { y: "100%",delay:1 });
    gsap.set(heroDesc, { opacity: 0, y: 30,delay:1 });
    gsap.set(ctaButton, { opacity: 0, y: 30 });
    gsap.set(scrollIndicator, { opacity: 0 });

    // Hero animation sequence
    heroTl.to('.loader h1', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: 'power4.out'
    })
        .to('.loader', {
            duration: 1,
            y: '-100%',
            ease: 'power4.inOut'
        })
        // Animate the title with a staggered effect
        .to(heroTitle, {
            duration: 0.6,
            y: "0%",
            stagger: 0.2,
        })
        // Animate the description
        .to(heroDesc, {
            duration: 0.8,
            opacity: 1,
            y: 0
        }, "-=0.6") // Start a bit before the title animation ends
        // Animate the CTA button
        .to(ctaButton, {
            duration: 0.8,
            opacity: 1,
            y: 0
        }, "-=0.6")
        // Animate the scroll indicator
        .to(scrollIndicator, {
            duration: 0.8,
            opacity: 1
        }, "-=0.4");

    // Parallax effect on scroll
    const heroSection = document.querySelector('.hero');
    const parallaxElements = [
        { element: heroSection, speed: 0.05 }
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Apply parallax to hero section
        parallaxElements.forEach(item => {
            gsap.to(item.element, {
                duration: 0.5,
                y: scrollY * item.speed,
                ease: "power1.out"
            });
        });

        // Fade out hero elements on scroll
        if (scrollY > 100) {
            gsap.to([heroTitle, heroDesc, ctaButton], {
                duration: 0.5,
                y: scrollY * 0.2,
                opacity: 1 - (scrollY * 0.003),
                ease: "power1.out"
            });

            gsap.to(scrollIndicator, {
                duration: 0.3,
                opacity: 0
            });
        } else {
            gsap.to([heroTitle, heroDesc, ctaButton], {
                duration: 0.5,
                y: 0,
                opacity: 1,
                ease: "power1.out"
            });

            gsap.to(scrollIndicator, {
                duration: 0.3,
                opacity: 1
            });
        }
    });

    // Interactive CTA button
    const ctaBtn = document.querySelector('.cta-btn');

    ctaBtn.addEventListener('mouseenter', () => {
        gsap.to(ctaBtn, {
            duration: 0.3,
            y: -5,
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(63, 142, 255, 0.3)"
        });
    });

    ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, {
            duration: 0.3,
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(63, 142, 255, 0)"
        });
    });
// Animation for the services section
const servicesSection = document.querySelector('.services');
const sectionHeader = servicesSection.querySelector('.section-header');
const sectionTitle = sectionHeader.querySelector('h2 span');
const sectionDesc = sectionHeader.querySelector('p');
const serviceCards = servicesSection.querySelectorAll('.service-card');

// Create a timeline for the services section
const servicesTl = gsap.timeline({
  scrollTrigger: {
    trigger: servicesSection,
    start: 'top 70%',
    toggleActions: 'play none none none'
  }
});

// Add animations to the timeline
servicesTl
  // Animate the section title
  .to(sectionTitle, {
    y: 0,
    duration: 1,
    ease: 'power3.out'
  })
  // Animate the section description
  .to(sectionDesc, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  // Animate the service cards
  .to(serviceCards, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'back.out(1.2)'
  }, '-=0.7');

// Add hover effect to service cards
serviceCards.forEach(card => {
  const cardIcon = card.querySelector('i');
  
  card.addEventListener('mouseenter', () => {
    gsap.to(cardIcon, {
      scale: 1.2,
      color: 'var(--primary)',
      duration: 0.3
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(cardIcon, {
      scale: 1,
      color: 'var(--accent)',
      duration: 0.3
    });
  });
});

// Optional: Create a "floating" animation for icons
serviceCards.forEach(card => {
  const icon = card.querySelector('i');
  
  gsap.to(icon, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

// Animation for the work section
const workSection = document.querySelector('.work');
const workHeader = workSection.querySelector('.section-header');
const workTitle = workHeader.querySelector('h2 span');
const workDesc = workHeader.querySelector('p');
const workItems = workSection.querySelectorAll('.work-item');

// Create a timeline for the work section
const workTl = gsap.timeline({
  scrollTrigger: {
    trigger: workSection,
    start: 'top 70%',
    toggleActions: 'play none none none'
  }
});

// Add animations to the timeline
workTl
  // Animate the section title - similar to services section for consistency
  .to(workTitle, {
    y: 0,
    duration: 1,
    ease: 'power3.out'
  })
  // Animate the section description
  .to(workDesc, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  // Animate the work items with a more dramatic stagger
  .to(workItems, {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.4)'
  }, '-=0.7');

// Add more dynamic hover effects for work items
workItems.forEach(item => {
  const itemImage = item.querySelector('img');
  const overlay = item.querySelector('.work-overlay');
  const overlayContent = overlay.querySelectorAll('h3, p, a');
  
  // Create a timeline for each work item hover
  const hoverTl = gsap.timeline({ paused: true });
  
  hoverTl
    .to(itemImage, {
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.out'
    }, 0)
    .to(overlay, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .fromTo(overlayContent, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, 0.1);
  
  // Set up hover events
  item.addEventListener('mouseenter', () => {
    hoverTl.play();
  });
  
  item.addEventListener('mouseleave', () => {
    hoverTl.reverse();
  });
});

// Add a subtle parallax effect to work item images on scroll
workItems.forEach(item => {
  const img = item.querySelector('img');
  
  ScrollTrigger.create({
    trigger: item,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to(img, {
        y: progress * 30,
        duration: 0.1,
        ease: 'none'
      });
    }
  });
});

// Add a click animation for the "View Project" buttons
const projectButtons = workSection.querySelectorAll('.work-overlay a');

projectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // This prevents immediate navigation to allow the animation to play
    // Remove if you want immediate navigation
    e.preventDefault();
    
    const clickTl = gsap.timeline({
      onComplete: () => {
        // Navigate to the href after animation completes
        // window.location.href = button.getAttribute('href');
        console.log('Navigating to project page');
      }
    });
    
    clickTl
      .to(button, {
        scale: 0.95,
        duration: 0.1
      })
      .to(button, {
        scale: 1,
        duration: 0.1
      })
      .to(button.closest('.work-item'), {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in'
      });
  });
});
 // About section animation
 const animateAbout = () => {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    // Create a timeline for the about section
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Animate the image
    aboutTl.to('.about-image', {
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    }, 0);

    // Animate the heading
    aboutTl.to('.about-text h2 span', {
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, 0.2);

    // Animate paragraphs with stagger
    aboutTl.to('.about-text p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }, 0.4);

    // Animate stats with stagger
    aboutTl.to('.stat-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)'
    }, 0.8);

    // Add a subtle hover effect to the stats
    gsap.utils.toArray('.stat-item').forEach(stat => {
        gsap.set(stat, { y: 0 }); // Reset any y positioning
        
        stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(stat.querySelector('h3'), {
                scale: 1.1,
                color: 'var(--primary)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(stat.querySelector('h3'), {
                scale: 1,
                color: 'var(--accent)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Add a subtle animation to the shape behind the image
    gsap.to('.about-image .shape', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            end: 'bottom top',
            scrub: 1
        },
        rotation: 360,
        scale: 1.2,
        duration: 3,
        ease: 'none'
    });
};

// Initialize animations
animateAbout();

// Additional animation for when the about section first comes into view
gsap.from('.about', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        toggleActions: 'play none none none'
    },
    backgroundColor: 'transparent',
    duration: 1,
    ease: 'power2.inOut'
});
// Animation for heading
gsap.to('.contact-info h2 span', {
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    }
  });
  
  // Animation for paragraph
  gsap.to('.contact-info p', {
    opacity: 1,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    }
  });
  
  // Animation for contact items
  gsap.to('.contact-item', {
    opacity: 1,
    stagger: 0.2,
    duration: 0.8,
    y: 0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-details',
      start: 'top 85%',
    }
  });
  
  // Animation for contact form
  gsap.to('.contact-form', {
    opacity: 1,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-content',
      start: 'top 70%',
    }
  });
  
  // Form input animations
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach((group, index) => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    // Initial state
    gsap.set(input, { y: 20, opacity: 0 });
    gsap.set(label, { y: 20, opacity: 0 });
    
    // Animation on scroll
    gsap.to([label, input], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.8 + (index * 0.1),
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
      }
    });
    
    // Add focus animation
    input.addEventListener('focus', () => {
      gsap.to(label, {
        color: 'var(--accent)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        gsap.to(label, {
          color: 'var(--text-light)',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
  
  // Submit button animation
});

  
  // Optional: Add a function to reinitialize animations
  // Useful when content loads dynamically or after page transitions
  function refreshServicesAnimations() {
    // Kill existing scroll triggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Re-initialize the animations
    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    
    servicesTl
      .to('.section-header h2 span', { y: 0, duration: 1, ease: 'power3.out' })
      .to('.section-header p', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.5')
      .to('.service-card', { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.7');
  }

  
  // Function to refresh work animations if needed
  function refreshWorkAnimations() {
    const workItems = document.querySelectorAll('.work-item');
    
    // Kill existing scroll triggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Re-initialize the animations
    const workTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.work',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    
    workTl
      .to('.work .section-header h2 span', { y: 0, duration: 1, ease: 'power3.out' })
      .to('.work .section-header p', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.5')
      .to(workItems, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.7');
  }

  // Get all pricing buttons
  const pricingButtons = document.querySelectorAll('.pricing-card-button');
        
  // Add click event listener to each button
  pricingButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get the selected plan from data attribute
          const selectedPlan = this.getAttribute('data-plan');
          
          // Update the hidden input and display text
          document.getElementById('selected-plan-input').value = selectedPlan;
          document.getElementById('selected-plan-display').innerText = `Selected Plan: ${selectedPlan}`;
          
          // Highlight the selected plan display
          const planDisplay = document.getElementById('selected-plan-display');
          planDisplay.style.backgroundColor = '#ebf4ff';
          planDisplay.style.borderLeftColor = '#4299e1';
          
          // Smooth scroll to the contact form
          document.getElementById('contact').scrollIntoView({ 
              behavior: 'smooth' 
          });
      });
  });

  // three 
  // 3D Objects Animation
  gsap.to('.object-1', {
    duration: 4,
    rotationY: 360,
    rotationX: 360,
    y: '20px',
    repeat: -1,
    yoyo: true,
    ease: "none",
});

gsap.to('.object-2', {
    duration: 5,
    rotationY: -360,
    rotationX: -360,
    x: '30px',
    repeat: -1,
    yoyo: true,
    ease: "none",
});

gsap.to('.object-3', {
    duration: 6,
    rotationY: 360,
    rotationZ: 360,
    y: '-20px',
    repeat: -1,
    yoyo: true,
    ease: "none",
});

// Circle Animation
gsap.to('.circle-1', {
    duration: 10,
    scale: 1.2,
    opacity: 0.7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
});

gsap.to('.circle-2', {
    duration: 8,
    scale: 1.1,
    opacity: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
});

// Three.js Background Effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

// Add Three.js canvas behind other elements
document.querySelector('.canvas-container').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.002;
    particlesMesh.rotation.x += 0.001;
    
    // Responsive to mouse movement
    particlesMesh.rotation.y += mouseX * 0.01;
    particlesMesh.rotation.x += mouseY * 0.01;
    
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
