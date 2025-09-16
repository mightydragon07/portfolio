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

// Fire drop animation
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

// Create electric particles background
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

// Glitch text effect
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

// Mobile Navigation System
function initMobileNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    if (!hamburgerBtn || !mobileOverlay) return;
    
    let isMenuOpen = false;
    
    // Open mobile menu
    function openMenu() {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        hamburgerBtn.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        const firstFocusable = mobileOverlay.querySelector('button, a');
        if (firstFocusable) firstFocusable.focus();
    }
    
    // Close mobile menu
    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        hamburgerBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Return focus to hamburger button
        hamburgerBtn.focus();
    }
    
    // Event listeners
    hamburgerBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            setTimeout(closeMenu, 300); // Small delay for smooth navigation
        });
    });
    
    // Close menu when clicking outside
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Handle resize - close menu if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && isMenuOpen) {
            closeMenu();
        }
    });
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

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = isMobile ? 80 : 120;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Desktop navbar scroll effects
function initNavbarScroll() {
    const desktopNav = document.querySelector('.desktop-nav');
    const navPill = document.querySelector('.nav-pill');
    
    if (!desktopNav || !navPill) return;
    
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navPill.style.background = 'rgba(5, 5, 15, 0.9)';
            navPill.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(0, 240, 255, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
        } else {
            navPill.style.background = 'rgba(10, 10, 30, 0.85)';
            navPill.style.boxShadow = `
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
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
        
        card.addEventListener('touchcancel', () => {
            card.classList.remove('touch-active');
        }, { passive: true });
    });
}

// Optimize animations based on device capabilities
function optimizeAnimations() {
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
    
    if (isLowPerformance) {
        document.body.classList.add('low-performance');
    }
    
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
                    if (!hasReducedMotion && !isLowPerformance) {
                        createParticles();
                    }
                }
            }
        });
    }, options);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
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
            
            if (fps < 25) {
                document.body.classList.add('low-performance');
                console.log('Low performance detected, reducing animations');
            }
            
            return;
        }
        
        requestAnimationFrame(countFrames);
    }
    
    requestAnimationFrame(countFrames);
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
    
    // Performance and optimization
    optimizeAnimations();
    monitorPerformance();
    
    // Visual effects
    setTimeout(() => {
        if (!hasReducedMotion) {
            createLightning();
            initGlitchEffect();
            initFireDrops();
        }
    }, 500);
    
    // Interaction handlers
    initProjectInteractions();
    
    // Scroll-based animations
    initScrollAnimations();
    animateSkills();
    initLazyAnimations();
    
    // Add dynamic styles
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* Loading optimizations */
        body:not(.loaded) .fade-in-up,
        body:not(.loaded) .fade-in-left,
        body:not(.loaded) .fade-in-right {
            opacity: 0;
            animation-play-state: paused;
        }
        
        /* Mobile specific optimizations */
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
        .is-touch .contact-card,
        .is-touch .mobile-nav-item {
            cursor: pointer;
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
            .nav-pill,
            .hamburger-btn {
                border: 2px solid var(--electric-blue);
            }
            
            .project-card,
            .contact-card,
            .mobile-nav-item {
                border: 1px solid var(--electric-blue);
            }
        }
        
        /* Page hidden state */
        .page-hidden .lightning,
        .page-hidden .fire-drop,
        .page-hidden .particle {
            animation-play-state: paused;
        }
        
        .page-hidden .digital-bg {
            animation-play-state: paused;
        }
    `;
    document.head.appendChild(dynamicStyles);
    
    // Mark as loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('Portfolio initialized successfully');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    document.body.classList.add('fallback-mode');
    
    // Ensure mobile navigation still works
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (hamburgerBtn && mobileOverlay && !hamburgerBtn.onclick) {
        hamburgerBtn.onclick = () => {
            mobileOverlay.style.display = mobileOverlay.style.display === 'block' ? 'none' : 'block';
        };
    }
});

// Utility functions
const utils = {
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
    
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
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

// Export utils
window.portfolioUtils = utils;