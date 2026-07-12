import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// ==========================================
// FIREBASE CONFIG
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyByu1gpPpPXLFXco0nwn8bKoqZ18-NqNUM",
    authDomain: "login-sign-up-c8b72.firebaseapp.com",
    projectId: "login-sign-up-c8b72",
    storageBucket: "login-sign-up-c8b72.firebasestorage.app",
    messagingSenderId: "235946023714",
    appId: "1:235946023714:web:b8cabc1604155e56fce37b",
    measurementId: "G-V75S8SMLJ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==========================================
// 1. NAV LOGIN / DASHBOARD CHECK
// ==========================================
const authLink = document.getElementById('authLink');
const authText = document.getElementById('authText');

onAuthStateChanged(auth, (user) => {
    if (user) {
        authText.textContent = 'Dashboard';
        authLink.href = 'dashboard.html';
    } else {
        authText.textContent = 'Login';
        authLink.href = 'login.html';
    }
});

// ==========================================
// 2. HAMBURGER MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ==========================================
// 3. NAVBAR SCROLL EFFECT
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.92)';
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// 4. WHATSAPP CONTACT FORM
// ==========================================
const form = document.querySelector('#contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('#yourname').value.trim();
    const email = document.querySelector('#youremail').value.trim();
    const phoneNumber = document.querySelector('#yourphoneNumber').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !phoneNumber || !message) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Please fill all fields',
            text: 'All fields are required to send a message.',
            background: '#1a2333',
            color: '#fff',
            confirmButtonColor: '#f39c12'
        });
        return;
    }

    const fullMessage = `
📩 New Inquiry from USTAAD JEE Website

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phoneNumber}
💬 Message: ${message}
    `.trim();

    const encodedMessage = encodeURIComponent(fullMessage);
    const adminNumber = '923142832602';
    const whatsappLink = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
    form.reset();

    Swal.fire({
        icon: 'success',
        title: '✅ Message Sent!',
        text: 'WhatsApp open ho raha hai. Bas "Send" button dabana hai!',
        background: '#1a2333',
        color: '#fff',
        confirmButtonColor: '#f39c12'
    });
});

// ==========================================
// 5. GSAP ANIMATIONS (Scroll + Entrance)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded!');
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 🔥 ZABARDAST ANIMATIONS
    // ==========================================

    // --- HERO SECTION: 3D PARALLAX ON IMAGE ---
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        gsap.to(heroImage, {
            y: 20,
            rotation: 2,
            scale: 1.02,
            duration: 1.5,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    // --- FLOATING BADGE: EXTRA GLOW PULSE ---
    const floatBadge = document.querySelector('.admissions-float-badge');
    if (floatBadge) {
        gsap.to(floatBadge, {
            boxShadow: '0 0 80px rgba(46, 204, 113, 0.6), 0 0 160px rgba(46, 204, 113, 0.3)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // --- HERO BADGES: STAGGER ENTRANCE ---
    const heroBadges = document.querySelectorAll('.hero-badge, .admissions-float-badge');
    gsap.fromTo(heroBadges,
        { opacity: 0, y: -30, scale: 0.8 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }
    );

    // --- HERO TITLE: SPLIT TEXT EFFECT ---
    const heroTitle = document.querySelector('#heroTitle');
    if (heroTitle) {
        gsap.fromTo(heroTitle,
            { opacity: 0, y: 50, rotationX: -20 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                ease: 'power3.out'
            }
        );
    }

    // --- HERO BUTTONS: POP IN ---
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    gsap.fromTo(heroButtons,
        { opacity: 0, scale: 0.7, rotation: -5 },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(2)'
        }
    );

    // ==========================================
    // 🎯 STATS: COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach((stat) => {
        const text = stat.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');

        if (!isNaN(num)) {
            gsap.fromTo(stat,
                { innerText: 0 },
                {
                    innerText: num,
                    duration: 2.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    onUpdate: function () {
                        if (Number.isInteger(num)) {
                            stat.innerText = Math.round(this.targets()[0].innerText) + suffix;
                        } else {
                            stat.innerText = parseFloat(this.targets()[0].innerText).toFixed(1) + suffix;
                        }
                    }
                }
            );
        }
    });

    // --- STATS CARDS: FADE UP ---
    const statItems = document.querySelectorAll('.stat-item');
    gsap.fromTo(statItems,
        { opacity: 0, y: 40, scale: 0.9 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '#statsSection',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // ==========================================
    // 🎯 GOAL SECTION: 3D TILT CARDS
    // ==========================================
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, rotationY: 20 },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // HOVER 3D TILT EFFECT
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                rotationY: 5,
                rotationX: -3,
                scale: 1.03,
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                boxShadow: 'none',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // ==========================================
    // 🎯 CAMPUS SECTION: REVEAL FROM SIDES
    // ==========================================
    const campusImage = document.querySelector('.campus-image');
    const campusContent = document.querySelector('.campus-content');

    if (campusImage) {
        gsap.fromTo(campusImage,
            { opacity: 0, x: -80, rotation: -5 },
            {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#campus',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    if (campusContent) {
        gsap.fromTo(campusContent,
            { opacity: 0, x: 80, rotation: 5 },
            {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#campus',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ==========================================
    // 🎯 COURSES: 3D CARD REVEAL
    // ==========================================
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.9, rotationX: 10 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // HOVER LIFT EFFECT
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                scale: 1.02,
                boxShadow: '0 15px 40px rgba(243,156,18,0.2)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: 'none',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // ==========================================
    // 🎯 FACULTY: STAGGER REVEAL WITH SPIN
    // ==========================================
    const teacherCards = document.querySelectorAll('.teacher-card');
    teacherCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40, rotationY: -30, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // AVATAR HOVER ANIMATION
        const avatar = card.querySelector('.avatar');
        if (avatar) {
            card.addEventListener('mouseenter', () => {
                gsap.to(avatar, {
                    scale: 1.1,
                    borderColor: '#f39c12',
                    boxShadow: '0 0 30px rgba(243,156,18,0.3)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(avatar, {
                    scale: 1,
                    borderColor: 'rgba(243,156,18,0.2)',
                    boxShadow: 'none',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        }
    });

    // ==========================================
    // 🎯 DEMO CTA: BOUNCE IN
    // ==========================================
    const demoContent = document.querySelector('.demo-content');
    if (demoContent) {
        gsap.fromTo(demoContent,
            { opacity: 0, y: 40, scale: 0.85 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '#demo',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ==========================================
    // 🎯 CONTACT: SIDE REVEAL
    // ==========================================
    const contactInfo = document.querySelector('#contactInfo');
    const contactFormWrapper = document.querySelector('#contactFormWrapper');

    if (contactInfo) {
        gsap.fromTo(contactInfo,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    if (contactFormWrapper) {
        gsap.fromTo(contactFormWrapper,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ==========================================
    // ✨ EXTRA: CONTINUOUS FLOATING FOR SHAPES
    // ==========================================
    const shapes = document.querySelectorAll('.float-shape');
    shapes.forEach((shape, i) => {
        gsap.to(shape, {
            y: -20 + i * 10,
            x: 20 + i * 8,
            rotation: 360 + i * 45,
            duration: 15 + i * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
        });
    });

    // ==========================================
    // ✨ NAV LOGO: CONTINUOUS FLOAT (Enhanced)
    // ==========================================
    const navLogo = document.querySelector('.nav-logo img');
    if (navLogo) {
        gsap.to(navLogo, {
            y: -6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // ==========================================
    // 🔥🔥🔥 NEW: 3 CONTINUOUS MOTION ANIMATIONS
    // ==========================================

    // --- 1. STATS NUMBERS: Continuous Pulse / Breathe Effect ---
    const statNumbersForPulse = document.querySelectorAll('.stat-item h3');
    statNumbersForPulse.forEach((stat, index) => {
        gsap.to(stat, {
            scale: 1.08,
            duration: 1.5 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });
    });

    // --- 2. COURSE CARDS: Continuous Gentle Floating (Up/Down) ---
    const courseCardsForFloat = document.querySelectorAll('.course-card');
    courseCardsForFloat.forEach((card, index) => {
        gsap.to(card, {
            y: -8 + (index % 2 === 0 ? 0 : 4),
            duration: 3 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.25
        });
        // Add subtle rotation for extra "zabardast" feel
        gsap.to(card, {
            rotation: 0.5,
            duration: 4 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });

    // --- 3. TEACHER CARDS: Continuous Subtle Sway + Avatar Glow Pulse ---
    const teacherCardsForSway = document.querySelectorAll('.teacher-card');
    teacherCardsForSway.forEach((card, index) => {
        // Subtle sway (rotation)
        gsap.to(card, {
            rotation: 0.8,
            duration: 4 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
        // Subtle y movement
        gsap.to(card, {
            y: -5 + (index % 2 === 0 ? 0 : 3),
            duration: 3.5 + index * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15
        });
        // Avatar glow pulse (continuous)
        const avatar = card.querySelector('.avatar');
        if (avatar) {
            gsap.to(avatar, {
                boxShadow: '0 0 30px rgba(243,156,18,0.25), 0 0 60px rgba(243,156,18,0.1)',
                duration: 2.5 + index * 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.2
            });
        }
    });

    console.log('🚀 USTAAD JEE — Zabardast GSAP Animations Loaded!');
    console.log('🔥 3 Extra Continuous Motion Animations Added:');
    console.log('  1️⃣ Stats Numbers — Pulse/Breathe');
    console.log('  2️⃣ Course Cards — Gentle Float + Rotation');
    console.log('  3️⃣ Teacher Cards — Sway + Avatar Glow');
});