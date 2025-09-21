// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.backdropFilter = 'blur(20px)';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.product-card, .solution-card, .team-card, .section-header');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Enhanced card hover effects with Continue.dev style
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            // Add subtle glow effect
            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
                icon.style.background = 'rgba(59, 130, 246, 0.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';

            const icon = this.querySelector('.product-icon');
            if (icon) {
                icon.style.boxShadow = 'none';
                icon.style.background = 'var(--bg-secondary)';
            }
        });
    });

    // Team card hover effects
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.avatar-image');
            if (avatar) {
                avatar.style.transform = 'scale(1.1)';
                avatar.style.borderColor = 'var(--primary)';
                avatar.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.2)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.avatar-image');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
                avatar.style.borderColor = 'var(--bg-secondary)';
                avatar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }
        });
    });

    // Parallax effect for hero section
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroGradient.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Button ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Code typing animation for Continue.dev style
    function typeCode() {
        const codeLines = document.querySelectorAll('.code-line .code-text');
        const codesToType = [
            '<span class="keyword">from</span> quseit <span class="keyword">import</span> AI',
            '',
            '<span class="comment"># 端云一体，智启未来</span>',
            '<span class="variable">ai</span> = AI(<span class="string">"QPython"</span>, <span class="string">"PGPT"</span>, <span class="string">"SimaCode"</span>)',
            '<span class="variable">future</span> = ai.<span class="function">create_intelligent_solution</span>()'
        ];

        // Clear all code lines first
        codeLines.forEach(line => line.innerHTML = '');

        // Type each line with delay
        codesToType.forEach((code, index) => {
            setTimeout(() => {
                if (codeLines[index]) {
                    typeWriterHTML(codeLines[index], code, 80);
                }
            }, index * 800);
        });
    }

    function typeWriterHTML(element, html, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || '';

        function type() {
            if (i < text.length) {
                element.innerHTML = html.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML = html;
            }
        }
        type();
    }

    // Start code animation
    setTimeout(() => {
        typeCode();
    }, 1000);

    // Number counter animation for solution features
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate feature values when they come into view
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const featureValue = entry.target.querySelector('.feature-value');
                if (featureValue && featureValue.textContent.includes('%')) {
                    const percentage = parseInt(featureValue.textContent);
                    if (percentage) {
                        featureValue.textContent = '0%';
                        setTimeout(() => {
                            animateCounter(featureValue, percentage);
                            featureValue.textContent = percentage + '%';
                        }, 300);
                    }
                }
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.feature').forEach(feature => {
        featureObserver.observe(feature);
    });

    // Stagger animation for grid items
    function staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    // Apply stagger animation to product cards when section is visible
    const productsSection = document.querySelector('.products');
    const productCardsForStagger = document.querySelectorAll('.product-card');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                staggerAnimation(productCardsForStagger, 200);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (productsSection) {
        staggerObserver.observe(productsSection);
    }

    // Dynamic gradient movement
    function moveGradient() {
        const gradientElements = document.querySelectorAll('.hero-gradient, .product-icon');
        gradientElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = event.clientX || window.innerWidth / 2;
            const mouseY = event.clientY || window.innerHeight / 2;

            const deltaX = (mouseX - centerX) * 0.01;
            const deltaY = (mouseY - centerY) * 0.01;

            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }

    // Add subtle mouse movement effect
    document.addEventListener('mousemove', moveGradient);

    // Preload images and optimize performance
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadImages();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Performance optimizations
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce resize events
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

// Optimize scroll handlers
const optimizedScrollHandler = throttle((event) => {
    // Scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize handlers
const optimizedResizeHandler = debounce(() => {
    // Resize-based recalculations here
}, 250);

window.addEventListener('resize', optimizedResizeHandler);