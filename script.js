// Made by bfd9
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Game Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const modCards = document.querySelectorAll('.mod-card, .game-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter mods/games
            modCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-game') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Enhanced Download Button Handler with animations
document.querySelectorAll('.btn-download, .download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Simulate download process with animations
        const originalText = btn.textContent;
        const originalBg = btn.style.background;
        btn.textContent = 'Downloading...';
        btn.disabled = true;
        btn.style.transform = 'scale(0.95)';
        btn.style.transition = 'all 0.3s';

        // Add loading animation
        btn.classList.add('loading');

        setTimeout(() => {
            btn.textContent = 'Download Complete!';
            btn.style.background = 'var(--success)';
            btn.style.transform = 'scale(1.1)';
            btn.classList.remove('loading');
            
            // Add success animation
            btn.style.animation = 'pulse 0.5s ease-in-out';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = originalBg || '';
                btn.style.transform = '';
                btn.style.animation = '';
            }, 2000);
        }, 1500);
    });
});

// Smooth Scroll
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

// Enhanced Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('active');
            }, index * 100); // Stagger animation
        }
    });
}, observerOptions);

// Observe all cards and sections with enhanced animations
document.querySelectorAll('.game-card, .mod-card, .feature-card, .stat, .support-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(card);
});

// Add reveal class to sections
document.querySelectorAll('.section-title, .games-header h1, .support-hero h1').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Game Detail Page - Load mods based on game parameter
function loadGameMods() {
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');
    
    if (!game) return;

    const gameData = {
        gta: {
            title: 'Grand Theft Auto V',
            mods: [
                {
                    name: 'Premium Menu',
                    version: 'v2.5.1',
                    description: 'This menu is pretty solid. Got everything you need - money, cars, god mode, teleporting around. Works smooth too.',
                    features: ['Unlimited Money', 'All Vehicles', 'God Mode', 'Teleportation', 'Weather Control'],
                    downloads: '15K+',
                    rating: '4.9'
                },
                {
                    name: 'Vehicle Spawner',
                    version: 'v1.8.3',
                    description: 'Want any car? Just spawn it. You can customize it too before it even spawns. Pretty handy.',
                    features: ['All Vehicles', 'Custom Mods', 'Instant Spawn', 'Save Favorites'],
                    downloads: '8K+',
                    rating: '4.7'
                },
                {
                    name: 'Money Generator',
                    version: 'v3.2.0',
                    description: 'Been using this for a while and it works. Gets you money without getting you banned. Can\'t promise 100% but it\'s been good to me.',
                    features: ['Safe Method', 'Undetectable', 'Instant Cash', 'No Ban Risk'],
                    downloads: '12K+',
                    rating: '4.8'
                }
            ]
        },
        fortnite: {
            title: 'Fortnite',
            mods: [
                {
                    name: 'Aimbot Pro',
                    version: 'v4.1.2',
                    description: 'The aimbot feels natural, not like some obvious bot. You can tweak the FOV and it actually helps without looking sus.',
                    features: ['Auto Aim', 'Target Prediction', 'Customizable FOV', 'Undetectable'],
                    downloads: '10K+',
                    rating: '4.8'
                },
                {
                    name: 'ESP Vision',
                    version: 'v2.9.5',
                    description: 'See everyone through walls. Shows distance too so you know how far they are. Pretty clean overlay.',
                    features: ['Wallhack', 'Player ESP', 'Item ESP', 'Distance Display'],
                    downloads: '7K+',
                    rating: '4.6'
                },
                {
                    name: 'Speed Hack',
                    version: 'v1.5.0',
                    description: 'Move faster, jump higher, no fall damage. Set your own speed so you don\'t go too crazy with it.',
                    features: ['Custom Speed', 'Jump Boost', 'No Fall Damage', 'Safe Mode'],
                    downloads: '5K+',
                    rating: '4.5'
                }
            ]
        },
        csgo: {
            title: 'Counter-Strike: Global Offensive',
            mods: [
                {
                    name: 'Legit Aimbot',
                    version: 'v5.3.1',
                    description: 'This one actually feels human. You can aim at specific bones and it looks natural. Been using it in comp for months.',
                    features: ['Humanized Aim', 'Bone Selection', 'Smooth Aim', 'Trigger Bot'],
                    downloads: '20K+',
                    rating: '4.9'
                },
                {
                    name: 'Wallhack ESP',
                    version: 'v3.7.2',
                    description: 'Shows you everything - players, weapons, bomb location, even health bars. Really helpful for knowing what\'s going on.',
                    features: ['Player ESP', 'Weapon ESP', 'Bomb ESP', 'Health Bars'],
                    downloads: '18K+',
                    rating: '4.8'
                },
                {
                    name: 'Bhop Script',
                    version: 'v2.1.0',
                    description: 'Perfect bhops every time. Timing is spot on and you can configure it how you want. Works even on lower FPS.',
                    features: ['Auto Bhop', 'Perfect Timing', 'Configurable', 'Low FPS'],
                    downloads: '9K+',
                    rating: '4.7'
                }
            ]
        }
    };

    const data = gameData[game];
    if (!data) return;

    // Update page title
    const pageTitle = document.querySelector('.game-title');
    if (pageTitle) {
        pageTitle.textContent = data.title;
    }

    // Render mods
    const modsContainer = document.querySelector('.mods-grid');
    if (modsContainer) {
        modsContainer.innerHTML = data.mods.map(mod => `
            <div class="mod-card">
                <div class="mod-header">
                    <div>
                        <h3 class="mod-title">${mod.name}</h3>
                        <span class="mod-version">${mod.version}</span>
                    </div>
                </div>
                <p class="mod-description">${mod.description}</p>
                <ul class="mod-features">
                    ${mod.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="mod-footer">
                    <div class="mod-stats">
                        <span><i class="fas fa-download"></i> ${mod.downloads}</span>
                        <span><i class="fas fa-star"></i> ${mod.rating}</span>
                    </div>
                    <button class="btn btn-primary btn-small download-btn">Download</button>
                </div>
            </div>
        `).join('');

        // Re-attach download handlers
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const originalText = btn.textContent;
                btn.textContent = 'Downloading...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.textContent = 'Download Complete!';
                    btn.style.background = 'var(--success)';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                    }, 2000);
                }, 1500);
            });
        });
    }
}

// Load game mods if on game detail page
if (window.location.pathname.includes('game-detail.html')) {
    loadGameMods();
}

// Enhanced Form Submission Handler with animations
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission with animations
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.transition = 'all 0.3s';

        // Animate form inputs
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.transition = 'all 0.3s';
            input.style.transform = 'scale(0.98)';
        });

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--success)';
            submitBtn.style.transform = 'scale(1.1)';
            submitBtn.style.animation = 'pulse 0.5s ease-in-out';
            
            // Reset inputs with animation
            inputs.forEach(input => {
                input.style.transform = 'scale(1)';
            });
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.transform = '';
                submitBtn.style.animation = '';
            }, 2000);
        }, 1500);
    });

    // Add focus animations to form inputs
    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add counter animation to stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + '+';
        }
    }, 16);
}

// Initialize counter animations when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    statNumber.classList.add('animated');
                    statNumber.textContent = '0+';
                    animateCounter(statNumber, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

