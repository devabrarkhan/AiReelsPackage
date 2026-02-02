document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MOBILE MENU TOGGLE
    // =========================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Icon animation toggle
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // =========================================
    // 2. 3D TILT EFFECT (HERO CARD)
    // =========================================
    const tiltContainer = document.getElementById('tilt-visual');
    const tiltCard = document.querySelector('.visual-card');

    if (tiltContainer && tiltCard) {
        tiltContainer.addEventListener('mousemove', (e) => {
            const rect = tiltContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on cursor position
            // Center is (0,0), range is -1 to 1
            const xPct = (x / rect.width) - 0.5;
            const yPct = (y / rect.height) - 0.5;

            // Multiply by max rotation degrees (e.g., 20deg)
            const xRot = yPct * -20; // Invert Y for natural tilt
            const yRot = xPct * 20;

            requestAnimationFrame(() => {
                tiltCard.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
            });
        });

        // Reset on mouse leave
        tiltContainer.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // =========================================
    // 3. BACKGROUND PARALLAX (LIQUID BLOBS)
    // =========================================
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.gradient-blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20; // Different speeds for depth
            const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
            const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // =========================================
    // 4. SCROLL SPY & GLOW NAVIGATION
    // =========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Handle Home separately since it might not be a section with ID
        if (window.scrollY < 100) current = 'home';

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // =========================================
    // 5. REVEAL ON SCROLL ANIMATION
    // =========================================
    const revealElements = document.querySelectorAll('.feature-card, .about-text, .stat-item, .cta-box');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.5, 0, 0, 1)';
        revealObserver.observe(el);
    });

    // Add class for CSS to pick up
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
