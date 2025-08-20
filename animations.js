// Create lightning effect with JavaScript
function createLightning() {
    const lightningContainer = document.querySelector('.lightning-container');
    const thunderOverlay = document.querySelector('.thunder-overlay');
    
    function addLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // Random position
        const posX = Math.random() * 100;
        lightning.style.left = posX + 'vw';
        
        // Random height
        const height = 100 + Math.random() * 100;
        lightning.style.height = height + 'px';
        
        lightningContainer.appendChild(lightning);
        
        // Animate lightning with JavaScript
        let opacity = 0;
        let growing = true;
        
        const animateLightning = () => {
            if (growing) {
                opacity += 0.1;
                if (opacity >= 0.8) growing = false;
            } else {
                opacity -= 0.05;
                if (opacity <= 0) {
                    if (lightning.parentNode) {
                        lightning.parentNode.removeChild(lightning);
                    }
                    return;
                }
            }
            
            lightning.style.opacity = opacity;
            requestAnimationFrame(animateLightning);
        };
        
        animateLightning();
        
        // Create thunder effect
        if (Math.random() > 0.7) {
            // Flash the screen
            let flashOpacity = 0.3;
            thunderOverlay.style.backgroundColor = `rgba(255, 255, 255, ${flashOpacity})`;
            
            // Animate flash out
            const animateFlash = () => {
                flashOpacity -= 0.05;
                if (flashOpacity <= 0) {
                    thunderOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                    return;
                }
                thunderOverlay.style.backgroundColor = `rgba(255, 255, 255, ${flashOpacity})`;
                requestAnimationFrame(animateFlash);
            };
            
            animateFlash();
        }
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
            
            // Animate with JavaScript
            let progress = 0;
            const startX = e.pageX;
            const startY = e.pageY;
            
            const animateDrop = () => {
                progress += 0.02;
                if (progress >= 1) {
                    if (fireDrop.parentNode) {
                        fireDrop.parentNode.removeChild(fireDrop);
                    }
                    return;
                }
                
                const currentX = startX + tx * progress;
                const currentY = startY + ty * progress;
                const scale = 1 - progress * 0.8;
                const opacity = 1 - progress;
                
                fireDrop.style.left = currentX + 'px';
                fireDrop.style.top = currentY + 'px';
                fireDrop.style.transform = `scale(${scale})`;
                fireDrop.style.opacity = opacity;
                
                requestAnimationFrame(animateDrop);
            };
            
            animateDrop();
        }
    });
}

// Create electric particles background with JavaScript
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
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'vw';
        particle.style.top = posY + 'vh';
        
        particlesContainer.appendChild(particle);
        
        // Animate particle with JavaScript
        let time = 0;
        const startX = posX;
        const startY = posY;
        
        const animateParticle = () => {
            time += 0.01;
            if (time >= duration) time = 0;
            
            const x = startX + Math.sin(time) * 10;
            const y = startY + Math.cos(time) * 10;
            
            particle.style.left = x + 'vw';
            particle.style.top = y + 'vh';
            
            requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
    }
}

// Sliding text animation with JavaScript
function initSlidingText() {
    const slidingWrapper = document.querySelector('.sliding-text-wrapper');
    const texts = document.querySelectorAll('.sliding-text');
    let currentIndex = 0;
    
    function slideText() {
        // Move to next text
        currentIndex = (currentIndex + 1) % texts.length;
        
        // Animate the slide
        slidingWrapper.style.transition = 'transform 1s ease-in-out';
        slidingWrapper.style.transform = `translateY(-${currentIndex * 60}px)`;
        
        // Schedule next slide
        setTimeout(slideText, 3000);
    }
    
    // Start the animation
    setTimeout(slideText, 2000);
}

// Glitch text effect with JavaScript
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            // Add glitch effect
            glitchText.style.textShadow = `
                0.05em 0 0 rgba(255, 0, 0, 0.5),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.5),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.5)
            `;
            
            // Remove glitch after short delay
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            }, 150);
        }
    }, 5000);
}

// Animate skill bars with JavaScript
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        let progress = 0;
        
        const animateBar = () => {
            progress += 2;
            if (progress >= parseInt(width)) {
                bar.style.width = width;
                return;
            }
            
            bar.style.width = progress + '%';
            requestAnimationFrame(animateBar);
        };
        
        // Start animation with a delay
        setTimeout(animateBar, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createLightning();
    createParticles();
    initSlidingText();
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