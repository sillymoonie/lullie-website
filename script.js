// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');

            // If switching to survey tab, trigger chart animations
            if (tabId === 'survey') {
                document.querySelectorAll('.chart-canvas').forEach(canvas => {
                    canvas.classList.add('visible');
                });
            }
        });
    });

    // Set global Chart.js defaults for dark theme
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.family = 'inherit';

    // Sleep Difficulty Data
    const sleepDifficultyData = {
        labels: [
            "A few times a week",
            "Occasionally",
            "Rarely or never",
            "Every night"
        ],
        datasets: [{
            label: 'Users',
            data: [14, 13, 5, 5],
            backgroundColor: ['#A20DE5', '#5C4BB5', '#3C3C3C', '#888']
        }]
    };

    // Music Usage Data
    const musicUsageData = {
        labels: [
            "Occasionally",
            "Interested in trying",
            "Don't think it helps",
            "Regularly",
            "Both Regularly + Occasionally"
        ],
        datasets: [{
            label: 'Users',
            data: [17, 12, 6, 1, 1],
            backgroundColor: [
                '#A20DE5',
                '#5C4BB5',
                '#3C3C3C',
                '#666',
                '#999'
            ]
        }]
    };

    // Sleep Hours Data
    const sleepHoursData = {
        labels: [
            "6-7 hours",
            "6-7 & 8+ hours",
            "4-5 & 6-7 hours",
            "4-5 hours",
            "8+ hours"
        ],
        datasets: [{
            label: 'Users',
            data: [24, 5, 3, 3, 2],
            backgroundColor: ['#A20DE5', '#5C4BB5', '#3C3C3C', '#666', '#999']
        }]
    };

    // Chart configurations
    const barConfig = (data, stacked = false) => ({
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    stacked: stacked,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: stacked,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    const pieConfig = (data) => ({
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Initialize charts
    const sleepDifficultyChart = new Chart(
        document.getElementById('sleepDifficultyChart'),
        barConfig(sleepDifficultyData, true)
    );

    const musicUsageChart = new Chart(
        document.getElementById('musicUsageChart'),
        pieConfig(musicUsageData)
    );

    const sleepHoursChart = new Chart(
        document.getElementById('sleepHoursChart'),
        barConfig(sleepHoursData)
    );

    // Scroll animation for charts
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    // Observe all chart canvases
    document.querySelectorAll('.chart-canvas').forEach(canvas => {
        observer.observe(canvas);
    });

    // Prototype stages animation
    const prototypeStages = document.querySelectorAll('.prototype-stage');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const stageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                stageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    prototypeStages.forEach(stage => {
        stageObserver.observe(stage);
    });

    // Smooth scroll for navigation links
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

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add initial styles for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });

    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Initial call to animate elements that are already in view
    animateOnScroll();

    // Mobile menu toggle (if needed in the future)
    // This is a placeholder for future mobile menu implementation
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            // Mobile menu implementation can be added here
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
}); 