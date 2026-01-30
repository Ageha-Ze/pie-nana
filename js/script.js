// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.add('loaded');

            // Trigger entrance animations after preloader
            setTimeout(() => {
                document.querySelectorAll('.hero-content > *').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 300);
        }, 800); // Show preloader for at least 800ms
    }
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ============================================

// Advanced Intersection Observer for scroll animations
const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optional: Unobserve after reveal for better performance
            // revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Apply scroll reveal to all sections and cards
const revealElements = document.querySelectorAll(`
    .section-header,
    .product-card, 
    .ingredient-card, 
    .step-card, 
    .feature-box,
    .feature-item,
    .comparison-box,
    .ingredients-summary,
    .order-cta,
    .content-grid,
    .info-box
`);

revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// ============================================
// FIXED PARALLAX EFFECT FOR HERO SECTION
// ============================================

// Parallax effect - hanya pada background, bukan pada seluruh hero element
// Disable pada mobile untuk performa lebih baik
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        // Gunakan background-position untuk parallax, bukan transform pada element
        const yPos = -(scrolled * 0.5);
        hero.style.backgroundPositionY = `${yPos}px`;
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// ENHANCED ANIMATIONS
// ============================================

// Counter animation for numbers
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Stagger animation for product grid
const staggerElements = document.querySelectorAll('.product-card, .ingredient-card');
staggerElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Smooth hover effect for cards
document.querySelectorAll('.product-card, .ingredient-card, .step-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// NAVBAR EFFECTS
// ============================================

// Navbar scroll effect with smooth transition
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, revealObserverOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.product-card, .ingredient-card, .step-card, .feature-box');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// WhatsApp float button animation
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    setInterval(() => {
        whatsappFloat.style.animation = 'none';
        setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 1s ease';
        }, 10);
    }, 3000);
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// Form validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading state to buttons
const orderButtons = document.querySelectorAll('.btn-order, .btn-whatsapp');
orderButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Console welcome message
console.log('%c🥧 Pie Nana Website', 'font-size: 24px; font-weight: bold; color: #6B4423;');
console.log('%cDibuat dengan ❤️ untuk Pie Brownies Premium', 'font-size: 14px; color: #666;');