// Mobile detection and device capabilities
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window;
const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

// Create lightning effect (optimized for mobile)
function createLightning() {
    if (hasReducedMotion) return;
    
    const lightningContainer = document.querySelector('.lightning-container');
    const thunderOverlay = document.querySelector('.thunder-overlay');
    
    if (!lightningContainer || !thunderOverlay) return;
    
    function addLightning() {
        // Reduce lightning frequency on mobile for performance
        if (isMobile && Math.random() > 0.4) return;
        if (isLowPerformance && Math.random() > 0.6) return;
        
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // Random position
        const posX = Math.random() * 100;
        lightning.style.left = posX + 'vw';
        
        // Random delay
        const delay = Math.random() * 3;
        lightning.style.animationDelay = delay + 's';
        
        lightningContainer.appendChild(lightning);
        
        // Create thunder effect (less frequent on mobile)
        const thunderChance = isMobile ? 0.3 : 0.5;
        if (Math.random() < thunderChance) {
            // Flash the screen
            thunderOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            
            // Remove flash after short delay
            setTimeout(() => {
                thunderOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            }, 80);
        }
        
        // Remove after animation completes
        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.parentNode.removeChild(lightning);
            }
        }, 3000);
    }
    
    // Create multiple lightning bolts (fewer on mobile)
    const lightningCount = isMobile ? 2 : isLowPerformance ? 3 : 4;
    for (let i = 0; i < lightningCount; i++) {
        setTimeout(addLightning, i * 1500);
    }
    
    // Continue creating lightning periodically (less frequent on mobile)
    const interval = isMobile ? 20000 : isLowPerformance ? 15000 : 12000;
    setInterval(addLightning, interval);
}

// Fire drop animation (enabled on mobile with throttling)
function initFireDrops() {
    if (hasReducedMotion || isLowPerformance) return;
    
    let lastDrop = 0;
    const throttleDelay = isMobile ? 100 : 50;
    
    function handleMove(e) {
        const now = Date.now();
        if (now - lastDrop < throttleDelay) return;
        
        // Create drops less frequently on mobile
        const dropChance = isMobile ? 0.1 : 0.3;
        if (Math.random() > dropChance) return;
        
        const fireDrop = document.createElement('div');
        fireDrop.className = 'fire-drop';
        document.body.appendChild(fireDrop);
        
        // Position the fire drop at cursor/touch
        let x, y;
        if (e.touches && e.touches[0]) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        } else {
            x = e.pageX || 0;
            y = e.pageY || 0;
        }
        
        fireDrop.style.left = x - 3 + 'px';
        fireDrop.style.top = y - 3 + 'px';
        
        // Randomize size slightly
        const size = Math.random() * 3 + 3;
        fireDrop.style.width = size + 'px';
        fireDrop.style.height = size + 'px';
        
        // Randomize movement direction
        const tx = (Math.random() - 0.5) * 80;
        const ty = (Math.random() - 0.5) * 80;
        
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
    if (!isMobile) {
        document.addEventListener('mousemove', handleMove, { passive: true });
    }
    
    if (isTouch) {
        document.addEventListener('touchmove', handleMove, { passive: true });
    }
}

// Create electric particles background (optimized count)
function createParticles() {
    if (hasReducedMotion) return;
    
    const particlesContainer = document.querySelector('.electric-particles');
    if (!particlesContainer) return;
    
    const particlesCount = isMobile ? 15 : isLowPerformance ? 25 : 40;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize particle properties
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 8 + 12;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'vw';
        particle.style.top = posY + 'vh';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Glitch text effect (optimized for mobile)
function initGlitchEffect() {
    if (hasReducedMotion) return;
    
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    const interval = isMobile ? 10000 : 6000;
    
    setInterval(() => {
        if (Math.random() < 0.08) {
            const intensity = isMobile ? 0.3 : 0.5;
            glitchText.style.textShadow = `
                ${0.03 * intensity}em 0 0 rgba(255, 0, 0, ${intensity}),
                ${-0.03 * intensity}em ${-0.02 * intensity}em 0 rgba(0, 255, 0, ${intensity}),
                ${-0.02 * intensity}em ${0.03 * intensity}em 0 rgba(0, 0, 255, ${intensity})
            `;
            
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            }, isMobile ? 100 : 150);
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
                }, isMobile ? 200 : 300);
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: isMobile ? 0.3 : 0.5
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
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
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
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
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
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
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
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight - (isMobile ? 20 : 40);
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar effects on scroll (simplified for floating design)
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navPill = document.querySelector('.nav-pill');
    
    if (!navbar || !navPill) return;
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        if (scrollY > 100) {
            navPill.style.background = 'rgba(5, 5, 15, 0.9)';
            navPill.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(0, 240, 255, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
            
            // Hide navbar when scrolling down on mobile
            if (isMobile && scrollDirection === 'down' && scrollY > 200) {
                navbar.style.transform = 'translateX(-50%) translateY(-100px)';
                navbar.style.opacity = '0';
            } else if (isMobile && scrollDirection === 'up') {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
                navbar.style.opacity = '1';
            }
        } else {
            navPill.style.background = 'rgba(10, 10, 30, 0.8)';
            navPill.style.boxShadow = `
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
            
            if (isMobile) {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
                navbar.style.opacity = '1';
            }
        }
        
        lastScrollY = scrollY;
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

// Project cards touch interactions
function initProjectInteractions() {
    if (!isTouch) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    const contactCards = document.querySelectorAll('.contact-card');
    
    [...projectCards, ...contactCards].forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-active');
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        }, { passive: true });
        
        // Handle touch cancel
        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-active');
        }, { passive: true });
    });
}

// Optimize animations based on device capabilities
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (hasReducedMotion) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            .lightning-container, .electric-particles {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        return;
    }
    
    // Disable intensive animations on low-end devices
    if (isLowPerformance) {
        document.body.classList.add('low-performance');
    }
    
    // Mobile-specific optimizations
    if (isMobile) {
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .digital-bg {
                animation-duration: 15s !important;
            }
            .glitch-text {
                animation-duration: 4s !important;
            }
            .particle {
                animation-duration: 20s !important;
            }
        `;
        document.head.appendChild(mobileStyle);
    }
}

// Lazy load animations
function initLazyAnimations() {
    const options = {
        threshold: 0.1,
        rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'welcome-section') {
                    // Welcome section is visible, start particles
                    if (!hasReducedMotion && !isLowPerformance) {
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
            
            // Reset navbar transform on desktop
            if (window.innerWidth > 768) {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    navbar.style.transform = 'translateX(-50%) translateY(0)';
                    navbar.style.opacity = '1';
                }
            }
        }, 250);
    });
}

// Performance monitoring
function monitorPerformance() {
    if (hasReducedMotion || isLowPerformance) return;
    
    let frameCount = 0;
    let startTime = performance.now();
    
    function countFrames() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - startTime > 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
            
            // If FPS is too low, reduce animations
            if (fps < 25) {
                document.body.classList.add('low-performance');
                console.log('Low performance detected, reducing animations');
            }
            
            return; // Stop monitoring after first second
        }
        
        requestAnimationFrame(countFrames);
    }
    
    requestAnimationFrame(countFrames);
}

// Initialize intersection observer for navbar visibility on mobile
function initNavbarVisibility() {
    if (!isMobile) return;
    
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection = entry.target.id;
            }
        });
        
        // Hide navbar in welcome section on mobile for cleaner look
        if (currentSection === 'welcome-section') {
            navbar.style.opacity = window.scrollY > 100 ? '1' : '0.8';
        } else {
            navbar.style.opacity = '1';
        }
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => observer.observe(section));
}

// Add loading animation for smooth startup
function initLoadingAnimation() {
    // Ensure all critical elements are loaded
    const criticalElements = [
        '.glitch-text',
        '.nav-pill',
        '.welcome-content'
    ];
    
    let loadedCount = 0;
    const checkInterval = setInterval(() => {
        loadedCount = criticalElements.filter(selector => 
            document.querySelector(selector)
        ).length;
        
        if (loadedCount === criticalElements.length) {
            clearInterval(checkInterval);
            document.body.classList.add('loaded');
            
            // Start animations after load
            setTimeout(() => {
                if (!hasReducedMotion) {
                    createLightning();
                    initGlitchEffect();
                    initFireDrops();
                }
            }, 500);
        }
    }, 50);
    
    // Fallback timeout
    setTimeout(() => {
        clearInterval(checkInterval);
        document.body.classList.add('loaded');
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loading...', {
        isMobile,
        isTouch,
        hasReducedMotion,
        isLowPerformance
    });
    
    // Add body classes for styling
    if (isMobile) document.body.classList.add('is-mobile');
    if (isTouch) document.body.classList.add('is-touch');
    if (hasReducedMotion) document.body.classList.add('reduced-motion');
    
    // Core functionality
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScroll();
    initNavbarVisibility();
    handleResize();
    
    // Performance and optimization
    optimizeAnimations();
    monitorPerformance();
    initLoadingAnimation();
    
    // Interaction handlers
    initProjectInteractions();
    
    // Scroll-based animations
    initScrollAnimations();
    animateSkills();
    initLazyAnimations();
    
    // Add performance and accessibility styles
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Loading state */
        body:not(.loaded) .fade-in-up,
        body:not(.loaded) .fade-in-left,
        body:not(.loaded) .fade-in-right {
            opacity: 0;
            animation-play-state: paused;
        }
        
        /* Mobile optimizations */
        .is-mobile .lightning {
            height: 100px;
        }
        
        .is-mobile .particle {
            opacity: 0.2;
        }
        
        .is-mobile .fire-drop {
            width: 4px;
            height: 4px;
        }
        
        /* Touch device optimizations */
        .is-touch .project-card,
        .is-touch .contact-card {
            cursor: pointer;
        }
        
        .is-touch .nav-item {
            -webkit-tap-highlight-color: rgba(0, 240, 255, 0.2);
        }
        
        /* Reduced motion fallbacks */
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .reduced-motion .lightning-container,
        .reduced-motion .electric-particles,
        .reduced-motion .digital-bg {
            display: none !important;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .nav-pill {
                border: 2px solid var(--electric-blue);
            }
            
            .project-card,
            .contact-card {
                border: 1px solid var(--electric-blue);
            }
        }
        
        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
            .nav-pill {
                background: rgba(5, 5, 15, 0.9);
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
    
    console.log('Portfolio initialized successfully');
});

// Service worker registration for PWA support
if ('serviceWorker' in navigator && !isMobile) {
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

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Fallback to basic functionality if animations fail
    document.body.classList.add('fallback-mode');
    
    // Ensure navigation still works
    if (!document.querySelector('.nav-item')) {
        console.warn('Navigation elements not found, initializing fallback nav');
    }
});

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause intensive animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
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
    },
    
    // Device detection
    getDeviceInfo: () => ({
        isMobile,
        isTouch,
        hasReducedMotion,
        isLowPerformance,
        pixelRatio: window.devicePixelRatio || 1,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    })
};

// Export utils for potential external use
window.portfolioUtils = utils;

// Add global styles for page hidden state
const hiddenPageStyles = document.createElement('style');
hiddenPageStyles.textContent = `
    .page-hidden .lightning,
    .page-hidden .fire-drop,
    .page-hidden .particle {
        animation-play-state: paused;
    }
    
    .page-hidden .digital-bg {
        animation-play-state: paused;
    }
`;
document.head.appendChild(hiddenPageStyles);