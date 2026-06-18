// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// ===== MOBILE MENU TOGGLE =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== TAB SWITCHING =====
function switchTab(tabName, button) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    if (button) {
        button.classList.add('active');
    }
}

function setupTabSwitching() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            if (tabName) {
                switchTab(tabName, button);
            }
        });
    });
}

// ===== SCROLL TO TOP =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'auto';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
    }
});

// ===== FORM SUBMISSION =====
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const message = event.target.elements[2].value;

    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    showNotification('Message sent successfully!', 'success');

    // Clear form
    event.target.reset();

    // Log the data (in a real app, this would be sent to a server)
    console.log('Form Data:', { name, email, message });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== ADD NOTIFICATION ANIMATIONS TO STYLESHEET =====
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(400px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL ANIMATIONS =====
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all activity cards and subject cards
    document.querySelectorAll('.activity-card, .subject-card, .hobby-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function parallaxEffect() {
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}

// ===== DARK MODE TOGGLE (Optional) =====
function setupDarkModeToggle() {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Listen for changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// ===== LAZY LOADING IMAGES (Optional) =====
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// ===== SKILL TAGS ANIMATION =====
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        tag.style.animation = `fadeIn ${0.5 + index * 0.1}s ease`;
    });
}

// ===== PAGE LOAD ANIMATIONS =====
function initPageLoad() {
    // Fade in page on load
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeIn 0.8s ease';
}

// ===== PERFORMANCE: DEBOUNCE SCROLL =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PREVENT MULTIPLE FORM SUBMISSIONS =====
function preventFormDoubleSubmit() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 2000);
        });
    }
}

// ===== INITIALIZE ALL FUNCTIONS ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    addNotificationStyles();
    observeElements();
    highlightActiveNavLink();
    setupDarkModeToggle();
    setupLazyLoading();
    animateSkillTags();
    preventFormDoubleSubmit();
    setupTabSwitching();
    initPageLoad();

    // Log message for debugging
    console.log('Student Resume Website Loaded Successfully!');
    console.log('© 2026 Alex Anderson');
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + / to show shortcuts
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        showNotification('Keyboard Shortcuts: Scroll to explore, click sections to navigate', 'info');
    }

    // Escape to close mobile menu
    if (event.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    // Page Down / Space to scroll
    if (event.key === 'ArrowDown' || event.key === ' ') {
        // Default behavior for these keys
    }
});

// ===== PERFORMANCE MONITORING =====
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });
    }
}

logPerformanceMetrics();

// ===== UTILITY: GET GREETING =====
function getGreeting() {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) {
        greeting = '☀️ Good Morning!';
    } else if (hour < 18) {
        greeting = '☀️ Good Afternoon!';
    } else {
        greeting = '🌙 Good Evening!';
    }

    return greeting;
}

// Log greeting to console
console.log(getGreeting() + ' Welcome to Alex Anderson\'s Resume Website!');

// ===== EXTERNAL LINKS TARGET BLANK =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== ENHANCE ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // Add focus visible state for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===== EXPORT FOR DEBUGGING =====
window.resumeWebsite = {
    showNotification,
    smoothScroll,
    switchTab,
    scrollToTop,
    getGreeting
};
