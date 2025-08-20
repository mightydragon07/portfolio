// Create lightning effect
function createLightning() {
    const lightningContainer = document.querySelector('.lightning-container');
    const thunderOverlay = document.querySelector('.thunder-overlay');
    
    function addLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // Random position
        const posX = Math.random() * 100;
        lightning.style.left = posX + 'vw';
        
        // Random delay
        const delay = Math.random() * 5;
        lightning.style.animationDelay = delay + 's';
        
        lightningContainer.appendChild(lightning);
        
        // Create thunder effect
        if (Math.random() > 0.7) {
            // Flash the screen
            thunderOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            
            // Remove flash after short delay
            setTimeout(() => {
                thunderOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            }, 100);
        }
        
        // Remove after animation completes
        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.parentNode.removeChild(lightning);
            }
        }, 5000);
    }
    
    // Create multiple lightning bolts
    for (let i = 0; i < 5; i++) {
        setTimeout(addLightning, i * 2000);
    }
    
    // Continue creating lightning periodically
    setInterval(addLightning, 10000);
}

// Fire drop animation
function initFireDrops() {
    document.addEventListener('mousemove', function(e) {
        // Create drops frequently
        if (Math.random() > 0.5) {
            const fireDrop = document.createElement('div');
            fireDrop.className = 'fire-drop';
            document.body.appendChild(fireDrop);
            
            // Position the fire drop at cursor
            fireDrop.style.left = e.pageX - 3 + 'px';
            fireDrop.style.top = e.pageY - 3 + 'px';
            
            // Randomize size slightly
            const size = Math.random() * 4 + 4;
            fireDrop.style.width = size + 'px';
            fireDrop.style.height = size + 'px';
            
            // Randomize movement direction
            const tx = (Math.random() - 0.5) * 100;
            const ty = (Math.random() - 0.5) * 100;
            
            // Apply animation
            fireDrop.style.setProperty('--tx', tx + 'px');
            fireDrop.style.setProperty('--ty', ty + 'px';
            
            // Remove element after animation completes
            setTimeout(() => {
                if (fireDrop.parentNode) {
                    fireDrop.parentNode.removeChild(fireDrop);
                }
            }, 1000);
        }
    });
}

// Create electric particles background
function createParticles() {
    const particlesContainer = document.querySelector('.electric-particles');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize particle properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'vw';
        particle.style.top = posY + 'vh';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Glitch text effect
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            glitchText.style.textShadow = `
                0.05em 0 0 rgba(255, 0, 0, 0.5),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.5),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.5)
            `;
            
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            }, 150);
        }
    }, 5000);
}

// Animate skill bars
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createLightning();
    createParticles();
    initGlitchEffect();
    initFireDrops();
    animateSkills();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 30, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 30, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});