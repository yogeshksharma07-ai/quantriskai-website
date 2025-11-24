// QuantRisk.AI Main JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeContactForm();
});

// Navigation Functions
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    navMenu.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
}

// Scroll Effects
function initializeScrollEffects() {
    // Add staggered delays to grid items
    const grids = document.querySelectorAll('.services-grid, .features-grid, .values-grid');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.fade-in');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
}

function handleContactSubmission(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showSuccessMessage();
        e.target.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');

    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-text">Thank you! We'll contact you soon to discuss your risk management needs.</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.5s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', debouncedScrollHandler);

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(notificationStyles);