// Enhanced mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

// Performance flags
let animationsEnabled = true;
let particlesEnabled = true;

// Create lightning effect (optimized for mobile)
function createLightning() {
    const lightningContainer = document.querySelector('.lightning-container');
    const thunderOverlay = document.querySelector('.thunder-overlay');
    
    if (!lightningContainer || !thunderOverlay || !animationsEnabled) return;
    
    function addLightning() {
        // Significantly reduce lightning on mobile and low-end devices
        if (isMobile && Math.random() > 0.2) return;
        if (isLowEnd && Math.random() > 0.1) return;
        
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
        const thunderChance = isMobile ? 0.3 : isLowEnd ? 0.4 : 0.7;
        if (Math.random() > thunderChance) {
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
        }, 4000);
    }
    
    // Create multiple lightning bolts (fewer on mobile)
    const lightningCount = isMobile ? 2 : isLowEnd ? 3 : 5;
    for (let i = 0; i < lightningCount; i++) {
        setTimeout(addLightning, i * 3000);
    }
    
    // Continue creating lightning periodically (less frequent on mobile)
    const interval = isMobile ? 20000 : isLowEnd ? 15000 : 10000;
    setInterval(addLightning, interval);
}

// Enhanced fire drop animation (mobile-optimized)
function initFireDrops() {
    // Enable on mobile but with reduced frequency
    let lastDrop = 0;
    const throttleDelay = isMobile ? 100 : 50;
    
    function handleMove(e) {
        if (!animationsEnabled) return;
        
        const now = Date.now();
        if (now - lastDrop < throttleDelay) return;
        
        // Create drops less frequently on mobile
        const dropChance = isMobile ? 0.15 : isLowEnd ? 0.2 : 0.3;
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
        
        // Randomize size slightly (smaller on mobile)
        const baseSize = isMobile ? 3 : 4;
        const size = Math.random() * 3 + baseSize;
        fireDrop.style.width = size + 'px';
        fireDrop.style.height = size + 'px';
        
        // Randomize movement direction (reduced on mobile)
        const moveRange = isMobile ? 50 : 100;
        const tx = (Math.random() - 0.5) * moveRange;
        const ty = (Math.random() - 0.5) * moveRange;
        
        // Apply animation
        fireDrop.style.setProperty('--tx', tx + 'px');
        fireDrop.style.setProperty('--ty', ty + 'px');
        
        lastDrop = now;
        
        // Remove element after animation completes
        setTimeout(() => {
            if (fireDrop.parentNode) {
                fireDrop.parentNode.removeChild(fireDrop);
            }
        }, 800);
    }
    
    // Add both mouse and touch events with passive listeners
    if (!isMobile) {
        document.addEventListener('mousemove', handleMove, { passive: true });
    }
    
    if (isTouch) {
        document.addEventListener('touchmove', handleMove, { passive: true });
        document.addEventListener('touchstart', handleMove, { passive: true });
    }
}

// Create electric particles background (mobile-optimized)
function createParticles() {
    const particlesContainer = document.querySelector('.electric-particles');
    if (!particlesContainer || !particlesEnabled) return;
    
    // Significantly fewer particles on mobile and low-end devices
    let particlesCount;
    if (isMobile) {
        particlesCount = 15;
    } else if (isLowEnd) {
        particlesCount = 25;
    } else {
        particlesCount = 50;
    }
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize particle properties
        const size = Math.random() * (isMobile ? 3 : 5) + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * (isMobile ? 8 : 10) + (isMobile ? 12 : 15);
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'vw';
        particle.style.top = posY + 'vh';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Enhanced glitch text effect (mobile-optimized)
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText || !animationsEnabled) return;
    
    const interval = isMobile ? 12000 : isLowEnd ? 8000 : 5000;
    
    setInterval(() => {
        if (Math.random() < 0.15) {
            const intensity = isMobile ? 0.3 : 0.5;
            glitchText.style.textShadow = `
                ${0.05 * intensity}em 0 0 rgba(255, 0, 0, ${intensity}),
                ${-0.05 * intensity}em ${-0.025 * intensity}em 0 rgba(0, 255, 0, ${intensity}),
                ${-0.025 * intensity}em ${0.05 * intensity}em 0 rgba(0, 0, 255, ${intensity})
            `;
            
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            }, isMobile ? 100 : 150);
        }
    }, interval);
}

// Enhanced skill bars animation with intersection observer
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
        return;
    }
    
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
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px'
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');
    const body = document.body;
    
    if (!mobileToggle || !navMenu) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileToggle.classList.add('active');
        navMenu.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Add ARIA attributes for accessibility
        mobileToggle.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
    }
    
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
        
        // Update ARIA attributes
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside (with improved detection)
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target) || mobileToggle.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileToggle.focus(); // Return focus to toggle button
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 100);
    });
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                // Use native smooth scrolling with fallback
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    animateScroll(targetPosition, 800);
                }
            }
        });
    });
}

// Fallback smooth scroll animation
function animateScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced navbar scroll effect with better performance
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const scrollThreshold = 50;
        
        if (scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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
    
    // Use passive listener for better performance
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial check
    updateNavbar();
}

// Enhanced project interactions for touch devices
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    const contactCards = document.querySelectorAll('.contact-card');
    
    if (!isTouch) return;
    
    // Add touch interactions for project cards
    projectCards.forEach(card => {
        let touchTimeout;
        
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-active');
            clearTimeout(touchTimeout);
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            touchTimeout = setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        }, { passive: true });
        
        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-active');
            clearTimeout(touchTimeout);
        }, { passive: true });
    });
    
    // Add touch interactions for contact cards
    contactCards.forEach(card => {
        let touchTimeout;
        
        card.addEventListener('touchstart', () => {
            card.classList.add('touch-active');
            clearTimeout(touchTimeout);
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            touchTimeout = setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        }, { passive: true });
        
        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-active');
            clearTimeout(touchTimeout);
        }, { passive: true });
    });
}

// Enhanced performance optimization
function optimizeAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        animationsEnabled = false;
        particlesEnabled = false;
        
        // Disable complex animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            .lightning, .fire-drop, .particle {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        return;
    }
    
    // Performance-based optimizations
    if (isLowEnd) {
        particlesEnabled = false;
        document.body.classList.add('low-performance');
    }
    
    // Battery API check (if available)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 && !battery.charging) {
                // Low battery - reduce animations
                animationsEnabled = false;
                particlesEnabled = false;
                document.body.classList.add('low-performance');
            }
        });
    }
    
    // Connection quality check (if available)
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            animationsEnabled = false;
            particlesEnabled = false;
        }
    }
}

// Enhanced lazy loading for animations
function initLazyAnimations() {
    if (!window.IntersectionObserver) return;
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Start animations for visible sections
                if (element.id === 'welcome-section' && particlesEnabled) {
                    // Delay particle creation slightly
                    setTimeout(() => {
                        createParticles();
                    }, 500);
                }
                
                // Trigger other section-specific animations
                if (element.id === 'projects') {
                    triggerProjectAnimations();
                }
                
                observer.unobserve(element);
            }
        });
    }, options);
    
    // Observe key sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// Trigger project-specific animations
function triggerProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animationPlayState = 'running';
        }, index * 100);
    });
}

// Enhanced resize handling
function handleResize() {
    let resizeTimer;
    let lastWidth = window.innerWidth;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentWidth = window.innerWidth;
            
            // Only process if width actually changed (avoid mobile scroll resize events)
            if (Math.abs(currentWidth - lastWidth) > 50) {
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                
                // Close mobile menu on resize to desktop
                if (currentWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                lastWidth = currentWidth;
            }
        }, 250);
    });
}

// Enhanced performance monitoring
function monitorPerformance() {
    if (!window.requestAnimationFrame || !performance) return;
    
    let frameCount = 0;
    let startTime = performance.now();
    let lowPerformanceDetected = false;
    
    function countFrames() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - startTime > 2000) { // Monitor for 2 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
            
            // If FPS is consistently low, reduce animations
            if (fps < 25 && !lowPerformanceDetected) {
                lowPerformanceDetected = true;
                animationsEnabled = false;
                particlesEnabled = false;
                document.body.classList.add('low-performance');
                console.log('Low performance detected, reducing animations. FPS:', fps);
            }
            
            return; // Stop monitoring after first check
        }
        
        requestAnimationFrame(countFrames);
    }
    
    // Start monitoring after a short delay
    setTimeout(() => {
        requestAnimationFrame(countFrames);
    }, 1000);
}

// Utility functions
const utils = {
    // Enhanced throttle function
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
    
    // Enhanced debounce function
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
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
    
    // Check if element is in viewport with offset
    isInViewport: (element, offset = 0) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= windowHeight + offset &&
            rect.right <= windowWidth + offset
        );
    },
    
    // Enhanced counter animation
    animateCounter: (element, target, duration = 2000) => {
        if (!element) return;
        
        let startTime = null;
        const start = parseInt(element.textContent) || 0;
        const difference = target - start;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Use easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easedProgress * difference + start);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = target; // Ensure final value is exact
            }
        }
        
        requestAnimationFrame(animation);
    },
    
    // Device detection utilities
    isMobileDevice: () => isMobile,
    isTouchDevice: () => isTouch,
    isLowEndDevice: () => isLowEnd,
    
    // Performance utilities
    reduceAnimations: () => {
        animationsEnabled = false;
        particlesEnabled = false;
        document.body.classList.add('low-performance');
    }
};

// Main initialization function
function initPortfolio() {
    console.log('Initializing portfolio...', {
        isMobile,
        isTouch,
        isLowEnd,
        animationsEnabled,
        particlesEnabled
    });
    
    // Core functionality (always load these)
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScroll();
    handleResize();
    
    // Performance optimizations
    optimizeAnimations();
    monitorPerformance();
    
    // Visual effects (conditionally loaded)
    if (animationsEnabled) {
        createLightning();
        initGlitchEffect();
        initFireDrops();
    }
    
    // Touch interactions
    initProjectInteractions();
    
    // Scroll-based animations
    initScrollAnimations();
    animateSkills();
    initLazyAnimations();
    
    // Add dynamic styles for better mobile experience
    addMobileOptimizedStyles();
    
    console.log('Portfolio initialized successfully');
}

// Add mobile-optimized styles dynamically
function addMobileOptimizedStyles() {
    const style = document.createElement('style');
    
    let mobileStyles = '';
    
    if (isTouch) {
        mobileStyles += `
            .project-card.touch-active,
            .contact-card.touch-active {
                transform: translateY(-5px) scale(0.98);
                box-shadow: 0 8px 25px rgba(0, 240, 255, 0.3);
            }
            
            .nav-item.touch-active {
                background: rgba(0, 240, 255, 0.1);
                transform: scale(0.95);
            }
            
            /* Improve touch targets */
            .nav-item,
            .project-btn,
            .contact-btn,
            .talk-btn {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                touch-action: manipulation;
            }
            
            /* Disable hover effects on touch devices */
            @media (hover: none) and (pointer: coarse) {
                .project-card:hover,
                .contact-card:hover,
                .nav-item:hover,
                .footer-social a:hover {
                    transform: none;
                    box-shadow: initial;
                    background: initial;
                    color: initial;
                }
                
                .nav-item:hover::after {
                    width: 0;
                }
                
                .nav-item:hover::before {
                    opacity: 0;
                }
            }
        `;
    }
    
    if (isLowEnd || !animationsEnabled) {
        mobileStyles += `
            .low-performance .lightning,
            .low-performance .fire-drop,
            .low-performance .particle {
                display: none !important;
            }
            
            .low-performance .digital-bg {
                animation: none;
                opacity: 0.8;
            }
            
            .low-performance .glitch-text {
                animation: none;
            }
            
            .low-performance * {
                transition-duration: 0.1s !important;
                animation-duration: 0.3s !important;
            }
        `;
    }
    
    style.textContent = mobileStyles;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Service worker registration (optional)
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
    animationsEnabled = false;
    particlesEnabled = false;
    document.body.classList.add('fallback-mode');
});

// Handle visibility change (for performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, reduce activity
        animationsEnabled = false;
    } else {
        // Page is visible again, restore animations if they were originally enabled
        if (!isLowEnd && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            animationsEnabled = true;
        }
    }
});

// Export utils for external use
window.portfolioUtils = utils;