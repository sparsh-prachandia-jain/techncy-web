// Create animated particles
    function createParticles() {
      const body = document.querySelector('body');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `floating ${duration}s infinite ease-in-out`;
        
        // Custom keyframe animation for each particle
        const keyframes = `
          @keyframes floating {
            0% {
              transform: translate(0, 0) rotate(0deg);
              opacity: ${Math.random() * 0.5 + 0.1};
            }
            50% {
              transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
              opacity: ${Math.random() * 0.7 + 0.3};
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
              opacity: ${Math.random() * 0.5 + 0.1};
            }
          }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        body.appendChild(particle);
      }
    }
    
    // Launch date countdown
    function updateCountdown() {
      // Set your launch date here (YYYY, MM-1, DD)
      const launchDate = new Date(2025, 6, 1); // July 1, 2025
      const now = new Date();
      const diff = launchDate - now;
      
      if (diff <= 0) {
        document.getElementById('countdown').textContent = "We're launching soon!";
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      document.getElementById('countdown').textContent = 
        `${days} days : ${hours} hours : ${minutes} mins : ${seconds} secs`;
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      createParticles();
      updateCountdown();
      setInterval(updateCountdown, 1000);
      
      // Form submission (prevent default for demo)
      document.querySelector('.email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.querySelector('.email-input').value;
        alert(`Thank you! We'll notify ${email} when we launch.`);
        document.querySelector('.email-input').value = '';
      });
    });
