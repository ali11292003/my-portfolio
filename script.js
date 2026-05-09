// ===== SCROLL FADE-IN ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '#ccc';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#7c3aed';
        }
    });
});


// ===== SMOOTH TYPING EFFECT =====
const roles = ["Web Developer 💻", "Designer 🎨", "Problem Solver 🧠"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
    if (!typingEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

type();
// ===== FLOATING PARTICLES =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// ===== EYE TRACKING CHARACTER =====
document.addEventListener('mousemove', (e) => {
    const pupils = [
        { pupil: document.getElementById('pupilLeft'),  eye: document.getElementById('eyeLeft') },
        { pupil: document.getElementById('pupilRight'), eye: document.getElementById('eyeRight') }
    ];

    pupils.forEach(({ pupil, eye }) => {
        if (!pupil || !eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = 5;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});