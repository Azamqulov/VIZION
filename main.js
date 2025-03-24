document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 2000);

    // Show cookie consent popup
    setTimeout(function() {
        if (!localStorage.getItem('cookiesAccepted')) {
            document.getElementById('cookieConsent').style.display = 'block';
        }
    }, 3000);

    // Accept cookies
    document.getElementById('acceptCookies').addEventListener('click', function() {
        document.getElementById('cookieConsent').style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });

    // Cookie info modal
    document.getElementById('cookieInfo').addEventListener('click', function() {
        document.getElementById('cookiesModal').style.display = 'block';
        document.getElementById('cookieConsent').style.display = 'none';
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', function() {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });

    document.addEventListener('mouseup', function() {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .filter-btn, .portfolio-item, .faq-question, .team-member');

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'transparent';
            cursorOutline.style.backgroundColor = 'rgba(255, 58, 94, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navClose = document.querySelector('.nav-close');

    navToggle.addEventListener('click', function() {
        mainNav.classList.add('active');
        navToggle.classList.add('active');
    });

    navClose.addEventListener('click', function() {
        mainNav.classList.remove('active');
        navToggle.classList.remove('active');
    });

    // Close navigation when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 16ms per frame (approx 60fps)
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger stats animation when section is in view
    const aboutSection = document.querySelector('.about');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    let statsAnimated = false;
    
    window.addEventListener('scroll', function() {
        if (!statsAnimated && isInViewport(aboutSection)) {
            animateStats();
            statsAnimated = true;
        }
    });

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Showreel modal
    const showreelBtn = document.querySelector('.btn-showreel');
    const showreelModal = document.getElementById('showreel');
    const showreelClose = document.querySelector('.showreel-close');
    const showreelVideo = document.getElementById('showreel-video');

    showreelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showreelModal.style.display = 'flex';
        showreelVideo.play();
    });

    showreelClose.addEventListener('click', function() {
        showreelModal.style.display = 'none';
        showreelVideo.pause();
    });

    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const progressBar = document.querySelector('.progress-bar');
    let currentIndex = 0;

    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        progressBar.style.width = `${(currentIndex + 1) * (100 / testimonialCards.length)}%`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Auto slide testimonials
    setInterval(function() {
        currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const newMessageBtn = document.getElementById('newMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(function() {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
        }, 1000);
    });

    newMessageBtn.addEventListener('click', function() {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'block';
        contactForm.reset();
    });

    // Modal functionality
    const privacyLink = document.getElementById('privacy-link');
    const termsLink = document.getElementById('terms-link');
    const cookiesLink = document.getElementById('cookies-link');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const cookiesModal = document.getElementById('cookiesModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'block';
    });

    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'block';
    });

    cookiesLink.addEventListener('click', function(e) {
        e.preventDefault();
        cookiesModal.style.display = 'block';
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            termsModal.style.display = 'none';
            cookiesModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
        if (e.target === cookiesModal) {
            cookiesModal.style.display = 'none';
        }
        if (e.target === showreelModal) {
            showreelModal.style.display = 'none';
            showreelVideo.pause();
        }
    });

    // Scroll animations
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for hero shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            const speed = 0.1;
            shape.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Reveal elements on scroll
        const revealElements = document.querySelectorAll('.section-header, .service-card, .portfolio-item, .testimonial-card, .contact-info, .contact-form-wrapper, .about-content, .about-team, .process-timeline, .clients-grid, .faq-item');
        
        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize scroll animations
    document.querySelectorAll('.section-header, .service-card, .portfolio-item, .testimonial-card, .contact-info, .contact-form-wrapper, .about-content, .about-team, .process-timeline, .clients-grid, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger initial scroll event to reveal visible elements
    window.dispatchEvent(new Event('scroll'));
});