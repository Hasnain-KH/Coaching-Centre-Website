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
        authLink.href = login.html;
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

👤 Name: ${ name}
📧 Email: ${ email}
📞 Phone: ${ phoneNumber}
💬 Message: ${ message}
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

    // Entrance Animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('#heroBadge, #freeBadge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }
    )
        .fromTo('#heroTitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.2'
        )
        .fromTo('#heroDesc',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.3'
        )
        .fromTo('#heroButtons',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.2'
        )
        .fromTo('#heroImage',
            { opacity: 0, x: 50, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1 },
            '-=0.6'
        );

    // Scroll Animations
    // Stats
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

    // Goal
    gsap.fromTo('#goalHeading',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: '#goal',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
    const goalCards = document.querySelectorAll('.goal-card');
    gsap.fromTo(goalCards,
        { opacity: 0, y: 40, scale: 0.92 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '#goalGrid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Campus
    gsap.fromTo('#campusImage',
        { opacity: 0, x: -50, scale: 0.9 },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '#campus',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
    gsap.fromTo('.campus-content',
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '#campus',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Courses
    gsap.fromTo('#coursesHeading',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: '#courses',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
    const courseCards = document.querySelectorAll('.course-card');
    gsap.fromTo(courseCards,
        { opacity: 0, y: 40, scale: 0.92 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
                trigger: '#coursesGrid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Faculty
    gsap.fromTo('#facultyHeading',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: '#faculty',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
    const teacherCards = document.querySelectorAll('.teacher-card');
    gsap.fromTo(teacherCards,
        { opacity: 0, y: 40, scale: 0.92 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
                trigger: '#facultyGrid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Demo CTA
    gsap.fromTo('.demo-content',
        { opacity: 0, y: 30, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '#demo',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Contact
    gsap.fromTo('#contactInfo, #contactFormWrapper',
        { opacity: 0, x: -40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});