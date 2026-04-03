// ========================================
// XÇØDËS - Interactive Functions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // 1. SMOOTH SCROLLING
    // ========================================
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

    // ========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.service-card, .example-card, .step, section h2, .section-line').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // ========================================
    // 3. NAVBAR ON SCROLL (Optional - adds class when scrolled)
    // ========================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class to body for potential navbar styling
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // 4. PARALLAX EFFECT ON HERO
    // ========================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        }
    });

    // ========================================
    // 5. TYPING EFFECT FOR TAGLINE
    // ========================================
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.visibility = 'visible';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ========================================
    // 6. PARTICLE MOUSE INTERACTION
    // ========================================
    const particles = document.querySelectorAll('.particle');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ========================================
    // 7. BUTTON RIPPLE EFFECT
    // ========================================
    document.querySelectorAll('.btn-primary, .btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // 8. COUNTER ANIMATION FOR STATS (if added)
    // ========================================
    const animateCounter = (el, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 30);
    };

    // ========================================
    // 9. GLITCH EFFECT ON LOGO HOVER
    // ========================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('glitch');
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.classList.remove('glitch');
        });
    }

    // ========================================
    // 10. STEP CARDS - SEQUENTIAL REVEAL
    // ========================================
    const steps = document.querySelectorAll('.step');
    const stepsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('step-revealed');
                }, index * 200);
            });
            stepsObserver.disconnect();
        }
    }, { threshold: 0.3 });

    const stepsSection = document.querySelector('.steps');
    if (stepsSection) {
        stepsObserver.observe(stepsSection);
    }

    // ========================================
    // 11. FORM VALIDATION (if form is added later)
    // ========================================
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // ========================================
    // 12. WHATSAPP LINK - AUTO FORMAT
    // ========================================
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            // Track click (for analytics if needed)
            console.log('WhatsApp button clicked');
            
            // Add pulse animation on click
            whatsappBtn.style.animation = 'none';
            setTimeout(() => {
                whatsappBtn.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    }

    // ========================================
    // 13. LAZY LOAD IMAGES
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // 14. CURSOR GLOW EFFECT
    // ========================================
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hide cursor glow on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    // ========================================
    // 15. CONSOLE EASTER EGG
    // ========================================
    console.log('%c🚀 XÇØDËS', 'font-size: 40px; font-weight: bold; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
    console.log('%cSimple websites. Real customers.', 'font-size: 16px; color: #a0a0b0;');
    console.log('%cInterested in working with us? Contact via WhatsApp!', 'font-size: 12px; color: #25D366;');

});

// ========================================
// PRELOADER (Optional)
// ========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 500);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});
