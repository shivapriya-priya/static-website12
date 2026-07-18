/* ===========================
   Portfolio JavaScript
   Ramu Bevara — DevOps & Cloud Engineer
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypingEffect();
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
    initCursorGlow();
    initCountUp();
    initContactForm();
    initSmoothScroll();
});

/* ===========================
   Particle Background
   =========================== */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.06 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ===========================
   Typing Effect
   =========================== */
function initTypingEffect() {
    const typedElement = document.getElementById('typedText');
    if (!typedElement) return;

    const strings = [
        'DevOps Engineer',
        'Cloud Architect',
        'CI/CD Specialist',
        'Docker & Kubernetes Expert',
        'AWS Certified Professional',
        'Tech Trainer'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentString = strings[stringIndex];

        if (isDeleting) {
            typedElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typingSpeed = 400; // Pause before next string
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a small delay
    setTimeout(type, 1000);
}

/* ===========================
   Scroll Animations (Intersection Observer)
   =========================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so we keep the animation if user scrolls back up
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ===========================
   Navbar Scroll Effect
   =========================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    let lastScroll = 0;

    function updateNavbar() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    // Active link highlighting
    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateNavbar();
        updateActiveLink();
    }, { passive: true });

    updateNavbar();
}

/* ===========================
   Mobile Menu
   =========================== */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const overlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    if (!toggle || !overlay) return;

    function closeMenu() {
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        toggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
        if (overlay.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ===========================
   Cursor Glow Effect
   =========================== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth follow with lerp
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ===========================
   Count Up Animation
   =========================== */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCount(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCount(element, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

/* ===========================
   Contact Form (Frontend only)
   =========================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Compose mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:ram11421.cse@gmail.com?subject=${subject}&body=${body}`;

        showNotification('Opening your email client...', 'success');
        form.reset();
    });
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '16px 24px',
        background: type === 'success'
            ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
        border: `1px solid ${type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: '12px',
        color: type === 'success' ? '#10b981' : '#ef4444',
        fontSize: '0.9rem',
        fontWeight: '500',
        fontFamily: "'Inter', sans-serif",
        backdropFilter: 'blur(20px)',
        zIndex: '9999',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        animation: 'slideInNotification 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });

    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

// Add notification animation keyframes
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideInNotification {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutNotification {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notifStyle);

/* ===========================
   Smooth Scroll for Anchor Links
   =========================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
