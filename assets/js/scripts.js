// Initialize EmailJS
emailjs.init("1EhhJ0VwoJLPSdP5J");

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
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
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
        // Contact Form with EmailJS Integration
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
    
                    // Prepare EmailJS template parameters
                    const templateParams = {
                        from_name: name.value,
                        from_email: email.value,
                        message: message.value,
                        to_name: 'Admin'
                    };
    
                    // Send email using EmailJS
                    emailjs.send(
                        'service_mjpss3c', // Replace with your EmailJS service ID
                        'template_drq9m83', // Replace with your EmailJS template ID
                        templateParams
                    )
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        contactForm.reset();
                        showAlert('Message sent successfully!', 'success');
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        showAlert('Failed to send message. Please try again.', 'danger');
                    })
                    .finally(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Send Message';
                    });
                }
            });
        }
    
        // Newsletter Form with EmailJS Integration
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
    
                // Prepare EmailJS template parameters
                const templateParams = {
                    subscriber_email: emailInput.value,
                    to_name: 'Admin',
                    subscription_type: 'Newsletter'
                };
    
                // Send email using EmailJS
                emailjs.send(
                    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                    'YOUR_NEWSLETTER_TEMPLATE_ID', // Replace with your newsletter template ID
                    templateParams
                )
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    newsletterForm.reset();
                    showAlert('Thank you for subscribing!', 'success');
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showAlert('Failed to subscribe. Please try again.', 'error');
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Subscribe';
                });
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
    // Domain Mapping and Course Selection
document.addEventListener('DOMContentLoaded', function() {
    // Domain Mapping Data
    const domainMapping = {
        "Medical & Healthcare": {
            "Medical": {
                "MBBS": "medical.html#mbbs",
                "BDS": "medical.html#bds",
                "BHMS": "medical.html#bhms",
                "BAMS": "medical.html#bams",
                "BUMS": "medical.html#bums",
                "BSMS": "medical.html#bsms",
                "B.V.Sc": "medical.html#bvsc"
            },
            "Nursing": {
                "B.Sc Nursing": "nursing.html#bsc",
                "M.Sc Nursing": "nursing.html#msc",
                "Diploma in Nursing": "nursing.html#diploma"
            },
            "Paramedical": {
                "B.Sc Anesthesia Technology": "paramedical.html#anesthesia",
                "B.Sc Cardiac Care Technology": "paramedical.html#cardiac",
                "B.Sc Imaging Technology": "paramedical.html#imaging",
                "B.Sc Laboratory Technology": "paramedical.html#laboratory",
                "B.Sc Perfusion Technology": "paramedical.html#perfusion",
                "B.Sc Emergency Care Technology": "paramedical.html#emergency",
                "B.Sc Occupational Therapy": "paramedical.html#occupational"
            },
            "Pharmacy": {
                "B.Pharm": "pharmacy.html#bpharm",
                "M.Pharm": "pharmacy.html#mpharm",
                "Pharm D": "pharmacy.html#pharmd",
                "D.Pharm": "pharmacy.html#diploma"
            },
            "Physiotherapy": {
                "BPT": "physiotherapy.html#bpt",
                "DPT": "physiotherapy.html#dpt",
                "B.Sc Physiotherapy": "physiotherapy.html#bsc",
                "MPT": "physiotherapy.html#mpt"
            }
        },
            "Engineering & Technology": {
            "Engineering": {
                "Mechanical": "engineering.html#mechanical",
                "Civil": "engineering.html#civil",
                "Electrical & Electronics (EEE)": "engineering.html#eee",
                "Electronics & Communication (ECE)": "engineering.html#ece",
                "Computer Science (CSE)": "engineering.html#cse",
                "Information Technology (IT)": "engineering.html#it",
                "Artificial Intelligence & Data Science (AI & DS)": "engineering.html#aids",
                "Artificial Intelligence & Machine Learning (AI & ML)": "engineering.html#aiml",
                "Computer Science & Business Systems (CS & BS)": "engineering.html#csbs",
                "Internet of Things (IoT)": "engineering.html#iot",
                "Cyber Security": "engineering.html#cyber",
                "Chemical Engineering": "engineering.html#chemical",
                "Biotechnology": "engineering.html#biotech",
                "Automobile Engineering": "engineering.html#auto",
                "Marine Engineering": "engineering.html#marine",
                "Aeronautical Engineering": "engineering.html#aero",
                "Agricultural Engineering": "engineering.html#agri",
                "Food Technology": "engineering.html#food",
                "Textile Engineering": "engineering.html#textile",
                "Petroleum Engineering": "engineering.html#petroleum",
                "Mining Engineering": "engineering.html#mining",
                "Robotics Engineering": "engineering.html#robotics",
                "Mechatronics": "engineering.html#mechatronics",
                "Biomedical Engineering": "engineering.html#biomedical",
                "Environmental Engineering": "engineering.html#environmental"
            },
            "Architecture & Planning": {
                "B.Arch": "architecture.html#barch",
                "B.Plan": "architecture.html#bplan",
                "B.Tech Urban Planning": "architecture.html#btech-urban",
                "M.Arch": "architecture.html#march",
                "M.Tech Urban Planning": "architecture.html#mtech-urban"
            },
        },
            "Law": {
                "Law Courses": {
                "BA LLB": "law.html#ballb",
                "BBA LLB": "law.html#bballb",
                "B.Com LLB": "law.html#bcomllb"
            },
        },
            "Arts & Science": {
            "Science": {
                "Int. M.Sc Biotechnology": "science.html#int-biotech",
                "Int. M.Sc Food Science": "science.html#int-food",
                "Int. M.Sc Statistics": "science.html#int-stats",
                "Int. M.Sc Physics": "science.html#int-physics",
                "Int. M.Sc Chemistry": "science.html#int-chem",
                "Int. M.Sc Mathematics": "science.html#int-math",
                "M.Sc Food Technology": "science.html#msc-food-tech",
                "M.Sc Anesthesia Technology": "science.html#msc-anesthesia",
                "M.Sc Medical Imaging": "science.html#msc-imaging",
                "M.Sc Laboratory Technology": "science.html#msc-lab",
                "M.Sc Cardiac Technology": "science.html#msc-cardiac",
                "MOT": "science.html#mot"
            },
            "Computer Applications & IT": {
                "BCA Cloud Computing": "computer.html#bca-cloud",
                "BCA AI & Cloud": "computer.html#bca-ai",
                "BCA Digital Arts": "computer.html#bca-digital",
                "BCA Mobile Development": "computer.html#bca-mobile",
                "MCA": "computer.html#mca",
                "M.Sc Cloud Computing": "computer.html#msc-cloud",
                "M.Sc Cybersecurity": "computer.html#msc-cyber",
                "M.Sc AI & ML": "computer.html#msc-ai",
                "M.Sc Data Science": "computer.html#msc-data",
                "M.Sc IoT": "computer.html#msc-iot"
            },
            "Agriculture": {
                "B.Sc Agriculture": "agriculture.html#bsc-agriculture",
                "B.Sc Horticulture": "agriculture.html#bsc-horticulture",
                "B.Sc Agri Business": "agriculture.html#bsc-agribusiness",
                "B.Sc Forestry": "agriculture.html#bsc-forestry",
                "B.Sc Sericulture": "agriculture.html#bsc-sericulture",
                "B.Sc Food & Nutrition": "agriculture.html#bsc-food-nutrition",
                "M.Sc Agricultural Economics": "agriculture.html#msc-agri-economics",
                "M.Sc Agriculture": "agriculture.html#msc-agriculture",
                "M.Sc Agronomy": "agriculture.html#msc-agronomy",
                "M.Sc Seed Science": "agriculture.html#msc-seed-science"
            },
            "Business & Commerce": {
                "BBA General": "management.html#bba-general",
                "BBA Sports": "management.html#bba-sports",
                "BBA Analytics": "management.html#bba-analytics",
                "BBA Logistics": "management.html#bba-logistics",
                "BBA Finance": "management.html#bba-finance",
                "BBA Entrepreneurship": "management.html#bba-entrepreneurship",
                "B.Com Business": "management.html#bcom-business",
                "B.Com Banking": "management.html#bcom-banking",
                "B.Com Financial": "management.html#bcom-financial"
            },
            "Design & Fashion": {
                "B.Des Fashion Design": "design.html#bdes-fashion",
                "B.Des Fashion Communication": "design.html#bdes-fashion-comm",
                "B.Des Product Design": "design.html#bdes-product",
                "B.Des Communication Design": "design.html#bdes-comm",
                "B.Des Industrial Design": "design.html#bdes-industrial",
                "B.Des Textile & Clothing": "design.html#bdes-textile"
            }
        }
    }; // End of domainMapping

    // Mobile domain selection handling
    const mobileDomainSelect = document.getElementById('mobileDomainType');
    const mobileSubDomainSelect = document.getElementById('mobileSubDomainType');
    const mobileCourseSelect = document.getElementById('mobileCourseType');
    const mobileExploreButton = document.getElementById('mobileExploreButton');

    // Initialize domain select options
    if (mobileDomainSelect) {
        mobileDomainSelect.innerHTML = '<option value="">Choose Domain</option>';
        Object.keys(domainMapping).forEach(domain => {
            const option = document.createElement('option');
            option.value = domain;
            option.textContent = domain;
            mobileDomainSelect.appendChild(option);
        });
    }

    // Domain change handler
    if (mobileDomainSelect) {
        mobileDomainSelect.addEventListener('change', function() {
            const selectedDomain = this.value;
            updateMobileSubDomainOptions(selectedDomain);
            resetMobileCourseSelect();
            updateMobileExploreButton();
        });
    }

    // Sub-domain change handler
    if (mobileSubDomainSelect) {
        mobileSubDomainSelect.addEventListener('change', function() {
            const selectedDomain = mobileDomainSelect.value;
            const selectedSubDomain = this.value;
            updateMobileCourseOptions(selectedDomain, selectedSubDomain);
            updateMobileExploreButton();
        });
    }

    // Course change handler
    if (mobileCourseSelect) {
        mobileCourseSelect.addEventListener('change', function() {
            updateMobileExploreButton();
        });
    }

    // Explore button handler
    if (mobileExploreButton) {
        mobileExploreButton.addEventListener('click', function() {
            const selectedDomain = mobileDomainSelect.value;
            const selectedSubDomain = mobileSubDomainSelect.value;
            const selectedCourse = mobileCourseSelect.value;

            if (selectedDomain && selectedSubDomain && selectedCourse) {
                const url = domainMapping[selectedDomain][selectedSubDomain][selectedCourse];
                if (url) {
                    window.location.href = url;
                }
            }
        });
    }

    // Helper functions for domain selection
    function updateMobileSubDomainOptions(selectedDomain) {
        mobileSubDomainSelect.innerHTML = '<option value="">Select Category</option>';
        if(selectedDomain && domainMapping[selectedDomain]) {
            Object.keys(domainMapping[selectedDomain]).forEach(subDomain => {
                const option = document.createElement('option');
                option.value = subDomain;
                option.textContent = subDomain;
                mobileSubDomainSelect.appendChild(option);
            });
        }
    }

    function updateMobileCourseOptions(selectedDomain, selectedSubDomain) {
        mobileCourseSelect.innerHTML = '<option value="">Select Course</option>';
        if(selectedDomain && selectedSubDomain && 
           domainMapping[selectedDomain][selectedSubDomain]) {
            Object.keys(domainMapping[selectedDomain][selectedSubDomain]).forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                mobileCourseSelect.appendChild(option);
            });
        }
    }

    function resetMobileCourseSelect() {
        mobileCourseSelect.innerHTML = '<option value="">First select category</option>';
        mobileExploreButton.disabled = true;
    }

    function updateMobileExploreButton() {
        mobileExploreButton.disabled = !mobileCourseSelect.value;
    }
});