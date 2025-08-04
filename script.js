// Hamburger menu toggle
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

if (menuIcon && nav) {
  menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('active');
    }
  });
});

// Typing animation
const roles = [
  "Web Developer",
  "Developer",
  "Web Designer",
  "Youtuber",
  "Script Writer"
];
let roleIndex = 0;
let charIndex = 0;
const typingSpan = document.querySelector('.typing-text span');

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingSpan.textContent = roles[roleIndex].substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 500);
  }
}

typeRole();

// Highlight active nav link on scroll using IntersectionObserver
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const sectionIdToNavLink = {};
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    sectionIdToNavLink[href.slice(1)] = link;
  }
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6 // 60% of section visible
};

let currentActive = navLinks[0];

function setActiveNav(id) {
  if (currentActive) currentActive.classList.remove('active');
  const newActive = sectionIdToNavLink[id];
  if (newActive) {
    newActive.classList.add('active');
    currentActive = newActive;
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
