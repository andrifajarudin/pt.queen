// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 35, 66, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#0A2342';
                header.style.backdropFilter = 'none';
            }
        });

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                // Store original target value if not already stored
                if (!counter.dataset.target) {
                    counter.dataset.target = counter.textContent.replace(/\D/g, '');
                    counter.dataset.suffix = counter.textContent.replace(/\d/g, '');
                }
                
                const target = parseInt(counter.dataset.target);
                const suffix = counter.dataset.suffix;
                let current = 0;
                const increment = target / 50;
                
                // Reset counter to 0 before starting animation
                counter.textContent = '0' + suffix;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            });
        }

        // Trigger counter animation every time stats section comes into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay to make the animation more noticeable
                    setTimeout(() => {
                        animateCounters();
                    }, 200);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% of the section is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before the section is fully visible
        });

        statsObserver.observe(document.querySelector('.stats'));

        // Mobile menu functionality
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('active');
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Hero slideshow functionality
        let slideIndex = 1;
        let slideInterval;

        function showSlide(n) {
            const slides = document.querySelectorAll('.hero-slide');
            const dots = document.querySelectorAll('.hero-dot');
            
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[slideIndex - 1].classList.add('active');
            dots[slideIndex - 1].classList.add('active');
        }

        function currentSlide(n) {
            slideIndex = n;
            showSlide(slideIndex);
            resetSlideInterval();
        }

        function nextSlide() {
            slideIndex++;
            showSlide(slideIndex);
        }

        function nextSlideManual() {
            slideIndex++;
            showSlide(slideIndex);
            resetSlideInterval();
        }

        function prevSlide() {
            slideIndex--;
            showSlide(slideIndex);
            resetSlideInterval();
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Auto-advance slides every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);

        // Pause slideshow on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        heroSection.addEventListener('mouseleave', () => {
            resetSlideInterval();
        });
