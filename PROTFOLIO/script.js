        // Sticky Header
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });

        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate Skill Bars on Scroll
        function animateSkillBars() {
            const skillLevels = document.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.width = level;
            });
        }

        // Avatar Animation
        const avatar = document.getElementById('avatar');
        let avatarState = 0;
        
        avatar.addEventListener('click', () => {
            avatarState = (avatarState + 1) % 3;
            
            switch(avatarState) {
                case 0:
                    avatar.innerHTML = '<i class="fas fa-user"></i>';
                    avatar.style.animation = 'pulse 0.5s ease';
                    break;
                case 1:
                    avatar.innerHTML = '<i class="fas fa-code"></i>';
                    avatar.style.animation = 'pulse 0.5s ease';
                    break;
                case 2:
                    avatar.innerHTML = '<i class="fas fa-rocket"></i>';
                    avatar.style.animation = 'pulse 0.5s ease';
                    break;
            }
            
            // Reset animation after it completes
            setTimeout(() => {
                avatar.style.animation = 'float 6s ease-in-out infinite';
            }, 500);
        });

        // Scroll Animation for Elements
        function checkScroll() {
            const projectCards = document.querySelectorAll('.project-card');
            const educationItems = document.querySelectorAll('.education-item');
            
            // Project Cards Animation
            projectCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.classList.add('visible');
                }
            });
            
            // Education Items Animation
            educationItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    item.classList.add('visible');
                }
            });
            
            // Animate skills when about section is in view
            const aboutSection = document.getElementById('about');
            if (aboutSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
                animateSkillBars();
            }
        }

        // Form Submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // CV Download
        const downloadCV = document.getElementById('downloadCV');
        downloadCV.addEventListener('click', function(e) {
            e.preventDefault();
            alert('CV download functionality would be implemented here. In a real application, this would download your PDF CV.');
            // In a real implementation, this would be:
            // window.open('path/to/your/cv.pdf', '_blank');
        });

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
