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
        authLink.href = 'auth.html';
    } else {
        authText.textContent = 'Login';
        authLink.href = 'auth.html';
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
// 5. GSAP ANIMATIONS (Kam — Sirf Scroll + Hover)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded!');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // HERO — Only Entrance Animations
    // ==========================================
    const heroBadges = document.querySelectorAll('.hero-badge, .admissions-float-badge');
    gsap.fromTo(heroBadges,
        { opacity: 0, y: -20, scale: 0.9 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.5)'
        }
    );

    gsap.fromTo('#heroTitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo('#heroDesc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo('#heroButtons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo('#heroImage',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    // ==========================================
    // STATS — Counter + Fade In
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
                    duration: 2,
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

    const statItems = document.querySelectorAll('.stat-item');
    gsap.fromTo(statItems,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            scrollTrigger: {
                trigger: '#statsSection',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // ==========================================
    // GOAL — Fade In
    // ==========================================
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ==========================================
    // CAMPUS — Fade In
    // ==========================================
    gsap.fromTo('.campus-image',
        { opacity: 0, x: -40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#campus',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    gsap.fromTo('.campus-content',
        { opacity: 0, x: 40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#campus',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // ==========================================
    // COURSES — Fade In
    // ==========================================
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ==========================================
    // FACULTY — Fade In (Kam Animation)
    // ==========================================
    const teacherCards = document.querySelectorAll('.teacher-card');
    teacherCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ==========================================
    // DEMO CTA — Fade In
    // ==========================================
    gsap.fromTo('.demo-content',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#demo',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // ==========================================
    // CONTACT — Fade In
    // ==========================================
    gsap.fromTo('#contactInfo',
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    gsap.fromTo('#contactFormWrapper',
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // ==========================================
    // ONLY BASIC CONTINUOUS — Floating Shapes
    // ==========================================
    const shapes = document.querySelectorAll('.float-shape');
    shapes.forEach((shape, i) => {
        gsap.to(shape, {
            y: -15 + i * 8,
            x: 10 + i * 5,
            rotation: 180 + i * 30,
            duration: 18 + i * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5
        });
    });

    console.log('🚀 USTAAD JEE — Animations Loaded (Reduced)');
});