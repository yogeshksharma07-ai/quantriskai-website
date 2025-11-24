// Animation Controllers for QuantRisk.AI

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        addMeterPulseAnimation();
        initializeParallax();
        initializeFloatingAnimations();
    }, 100);

    initializeHeroAnimations();
    initializeCounterAnimations();
    initializeServiceCardAnimations();
});

// Hero Section Animations
function initializeHeroAnimations() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;

    // Store original text and clear
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    // Typing effect
    let index = 0;
    function typeText() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, 80);
        } else {
            // Add cursor blink effect briefly
            heroTitle.style.borderRight = '3px solid white';
            heroTitle.style.animation = 'blink 1s infinite';

            // Remove cursor after 3 seconds
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }, 3000);
        }
    }

    // Start typing after hero section is visible
    setTimeout(typeText, 1000);
}

// Counter Animations for Statistics
function initializeCounterAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const numericTarget = parseInt(target.replace(/[^\d]/g, ''));

    let current = 0;
    const increment = numericTarget / 50; // 50 steps for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;

    element.textContent = '0' + (isPercentage ? '%' : '+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = displayValue + (isPercentage ? '%' : '+');
        }
    }, stepTime);
}

// Service Card Hover Animations
function initializeServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });
}

function handleCardHover(e) {
    const icon = e.target.querySelector('.service-icon');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    }
}

function handleCardLeave(e) {
    const icon = e.target.querySelector('.service-icon');
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// Parallax Effect for Hero Background
function initializeParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Floating Action Animations
function initializeFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.feature-icon');

    floatingElements.forEach((element, index) => {
        // Add subtle floating animation with different delays
        element.style.animation = `float 6s ease-in-out ${index * 0.5}s infinite`;
    });
}

// Meter Pulse Animation for High Risk
function addMeterPulseAnimation() {
    const pulseStyles = document.createElement('style');
    pulseStyles.textContent = `
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
        }
        
        @keyframes blink {
            0%, 50% {
                border-color: transparent;
            }
            51%, 100% {
                border-color: white;
            }
        }
        
        .meter-circle.high-risk {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(pulseStyles);
}

// Smooth scroll to section with highlight
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Scroll to section
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Highlight section briefly
    section.style.transition = 'background-color 0.5s ease';
    section.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';

    setTimeout(() => {
        section.style.backgroundColor = 'transparent';
    }, 2000);
}

// Loading Animation for Page Load
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">QuantRisk.AI</div>
            <div class="loader-spinner"></div>
        </div>
    `;

    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    `;

    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            margin: 0 auto;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(loaderStyles);
    document.body.appendChild(loader);

    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// Initialize page loader
showPageLoader();