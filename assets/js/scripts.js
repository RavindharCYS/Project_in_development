// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });

    // Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show'); // Changed from 'active' to 'show'
        } else {
            scrollToTopBtn.classList.remove('show'); // Changed from 'active' to 'show'
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                navbar.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                navbar.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        });
    }

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Reset error states
            removeErrorState(name);
            removeErrorState(email);
            removeErrorState(message);

            // Validate name
            if (!name.value.trim()) {
                addErrorState(name, 'Name is required');
                isValid = false;
            }

            // Validate email
            if (!isValidEmail(email.value)) {
                addErrorState(email, 'Please enter a valid email');
                isValid = false;
            }

            // Validate message
            if (!message.value.trim()) {
                addErrorState(message, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

                // Simulate form submission (replace with actual form submission)
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';

                    // Show success message
                    showAlert('Message sent successfully!', 'success');
                }, 2000);
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');

            if (!isValidEmail(emailInput.value)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';

            // Simulate newsletter subscription (replace with actual subscription logic)
            setTimeout(function() {
                newsletterForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Subscribe';
                showAlert('Thank you for subscribing!', 'success');
            }, 2000);
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.innerText);
                        let count = 0;
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60 FPS

                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };

                        updateCount();
                        observer.unobserve(counter);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Testimonial Carousel (if using Bootstrap carousel)
    const testimonialCarousel = document.querySelector('#testimonialCarousel');
    
    if (testimonialCarousel) {
        new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            touch: true
        });
    }

    // Image Gallery Lightbox (if needed)
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                // Implement lightbox functionality here
                // You might want to use a library like Fancybox or create your own
            });
        });
    }

    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function addErrorState(element, message) {
        element.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.innerText = message;
        element.parentNode.appendChild(feedback);
    }

    function removeErrorState(element) {
        element.classList.remove('is-invalid');
        const feedback = element.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.remove();
        }
    }

    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Find a suitable container for the alert
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
        }

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Mobile Menu Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Initialize Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Custom File Input
    const customFileInput = document.querySelector('.custom-file-input');
    if (customFileInput) {
        customFileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name || 'Choose file';
            const nextSibling = e.target.nextElementSibling;
            if (nextSibling) {
                nextSibling.innerText = fileName;
            }
        });
    }

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Window Load Event
window.addEventListener('load', function() {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Window Resize Event
window.addEventListener('resize', function() {
    // Add any resize-specific functionality here
});

// Window Scroll Event
window.addEventListener('scroll', function() {
    // Add any scroll-specific functionality here
});

// Window Before Unload Event
window.addEventListener('beforeunload', function(e) {
    // Add any cleanup or warning messages here if needed
});
