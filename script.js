/* =====================
   CUSTOM CURSOR
======================== */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth trailing cursor
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor scale on hover
document.querySelectorAll('a, button, .skill-pill, .deco-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--accent-2)';
    cursorTrail.style.width = '52px';
    cursorTrail.style.height = '52px';
    cursorTrail.style.borderColor = 'rgba(167,139,250,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--accent)';
    cursorTrail.style.width = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'rgba(126,232,250,0.4)';
  });
});

/* =====================
   NAVBAR SCROLL EFFECT
======================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =====================
   MOBILE MENU
======================== */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =====================
   REVEAL ON SCROLL
======================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

/* =====================
   PROGRESS BARS
======================== */
const progressFills = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 300);
      progressObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

progressFills.forEach(fill => progressObserver.observe(fill));

/* =====================
   SMOOTH ACTIVE NAV
======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

/* =====================
   HERO PARALLAX
======================== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if (hero) hero.style.transform = `translateY(${scrolled * 0.15}px)`;
  if (heroVisual) heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
});

/* =====================
   TYPING EFFECT (Tagline)
======================== */
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const text = heroSub.textContent;
  heroSub.textContent = '';
  heroSub.style.opacity = '1';

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      heroSub.textContent += text[i];
      i++;
      setTimeout(typeChar, 35);
    }
  }

  // Start after page load + reveal delay
  setTimeout(typeChar, 900);
}

/* =====================
   CONSOLE EASTER EGG
======================== */
console.log('%c👩🏻‍💻 Hey! You found the console — curious mind detected!', 'color: #7ee8fa; font-size: 14px; font-weight: bold;');
console.log('%cPortfolio built by Hannie with HTML, CSS & JS ✨', 'color: #a78bfa; font-size: 12px;');