// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window;

// Create lightning effect (reduced on mobile)
function createLightning() {
    const lightningContainer = document.querySelector('.lightning-container');
    const thunderOverlay = document.querySelector('.thunder-overlay');
    
    if (!lightningContainer || !thunderOverlay) return;
    
    function addLightning() {
        // Reduce lightning on mobile for performance
        if (isMobile && Math.random() > 0.3) return;
        
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // Random position
        const posX = Math.random() * 100;
        lightning.style.left = posX + 'vw';
        
        // Random delay
        const delay = Math.random() * 5;
        lightning.style.animationDelay = delay + 's';
        
        lightningContainer.appendChild(lightning);
        
        // Create thunder effect (less frequent on mobile)
        const thunderChance = isMobile ? 0.5 : 0.7;
        if (Math.random() > thunderChance) {
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
    
    // Create multiple lightning bolts (fewer on mobile)
    const lightningCount = isMobile ? 3 : 5;
    for (let i = 0; i < lightningCount; i++) {
        setTimeout(addLightning, i * 2000);
    }
    
    // Continue creating lightning periodically (less frequent on mobile)
    const interval = isMobile ? 15000 : 10000;
    setInterval(addLightning, interval);
}

// Fire drop animation (optimized for mobile)
function initFireDrops() {
    // Skip on mobile for better performance
    if (isMobile) return;
    
    let lastDrop = 0;
    const throttleDelay = 50; // Throttle to prevent too many drops
    
    function handleMove(e) {
        const now = Date.now();
        if (now - lastDrop < throttleDelay) return;
        
        // Create drops less frequently
        if (Math.random() > 0.3) return;
        
        const fireDrop = document.createElement('div');
        fireDrop.className = 'fire-drop';
        document.body.appendChild(fireDrop);
        
        // Position the fire drop at cursor/touch
        const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
        const y = e.pageY || (e.touches && e.touches[0].pageY) || 0;
        
        fireDrop.style.left = x - 3 + 'px';
        fireDrop.style.top = y - 3 + 'px';
        
        // Randomize size slightly
        const size = Math.random() * 4 + 4;
        fireDrop.style.width = size + 'px';
        fireDrop.style.height = size + 'px';
        
        // Randomize movement direction
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        
        // Apply animation
        fireDrop.style.setProperty('--tx', tx + 'px');
        fireDrop.style.setProperty('--ty', ty + 'px');
        
        lastDrop = now;
        
        // Remove element after animation completes
        setTimeout(() => {
            if (fireDrop.parentNode) {
                fireDrop.parentNode.removeChild(fireDrop);
            }
        }, 1000);
    }
    
    // Add both mouse and touch events
    document.addEventListener('mousemove', handleMove);
    if (isTouch) {
        document.addEventListener('touchmove', handleMove, { passive: true });
    }
}

// Create electric particles background (reduced count on mobile)
function createParticles() {
    const particlesContainer = document.querySelector('.electric-particles');
    if (!particlesContainer) return;
    
    const particlesCount = isMobile ? 20 : 50; // Fewer particles on mobile
    
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

// Glitch text effect (less intensive on mobile)
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    const interval = isMobile ? 8000 : 5000; // Less frequent on mobile
    
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
    }, interval);
}

// Animate skill bars with intersection observer
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Mobile navigation toggle
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');
    
    if (!mobileToggle || !navMenu) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar background on scroll with throttling
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 30, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 30, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Project cards hover effect on mobile (touch)
function initProjectInteractions() {
    if (!isTouch) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-active');
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        }, { passive: true });
    });
}

// Optimize animations based on device capabilities
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable complex animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
        return;
    }
    
    // Disable intensive animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
    }
}

// Lazy load animations
function initLazyAnimations() {
    // Only start intensive animations when elements are visible
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animations for visible sections
                if (entry.target.id === 'welcome-section') {
                    // Welcome section is visible, start particles if not mobile
                    if (!isMobile) {
                        createParticles();
                    }
                }
            }
        });
    }, options);
    
    // Observe key sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

// Handle resize events
function handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any position-dependent elements
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250);
    });
}

// Performance monitoring
function monitorPerformance() {
    // Check if device can handle intensive animations
    let frameCount = 0;
    let startTime = performance.now();
    
    function countFrames() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - startTime > 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
            
            // If FPS is too low, reduce animations
            if (fps < 30) {
                document.body.classList.add('low-performance');
                console.log('Low performance detected, reducing animations');
            }
            
            return; // Stop monitoring after first second
        }
        
        requestAnimationFrame(countFrames);
    }
    
    requestAnimationFrame(countFrames);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScroll();
    handleResize();
    
    // Animations (with performance considerations)
    optimizeAnimations();
    monitorPerformance();
    
    // Initialize visual effects
    createLightning();
    initGlitchEffect();
    initFireDrops();
    initProjectInteractions();
    
    // Scroll-based animations
    initScrollAnimations();
    animateSkills();
    initLazyAnimations();
    
    // Add CSS for touch interactions
    if (isTouch) {
        const style = document.createElement('style');
        style.textContent = `
            .project-card.touch-active,
            .contact-card.touch-active {
                transform: translateY(-10px);
                box-shadow: 0 10px 30px rgba(0, 240, 255, 0.2);
            }
            
            .contact-card.touch-active {
                background: rgba(0, 240, 255, 0.1);
            }
            
            /* Improve touch targets */
            .nav-item,
            .project-btn,
            .contact-btn,
            .talk-btn {
                min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            /* Disable hover effects on touch devices */
            @media (hover: none) {
                .project-card:hover,
                .contact-card:hover,
                .nav-item:hover,
                .footer-social a:hover {
                    transform: none;
                    box-shadow: initial;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add performance-based styles
    const performanceStyle = document.createElement('style');
    performanceStyle.textContent = `
        .low-performance .lightning,
        .low-performance .fire-drop,
        .low-performance .particle {
            display: none;
        }
        
        .low-performance .digital-bg {
            animation: none;
            opacity: 0.8;
        }
        
        .low-performance .glitch-text {
            animation: none;
        }
    `;
    document.head.appendChild(performanceStyle);
    
    console.log('Portfolio initialized successfully');
});

// Service worker registration for PWA support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Fallback to basic functionality if animations fail
    document.body.classList.add('fallback-mode');
});

// Utility functions
const utils = {
    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Debounce function for resize events
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Animate counter numbers
    animateCounter: (element, target, duration = 2000) => {
        let startTime = null;
        const start = parseInt(element.textContent) || 0;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            element.textContent = Math.floor(progress * (target - start) + start);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
};

// Export utils for potential external use
window.portfolioUtils = utils;