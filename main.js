/* ═══════════════════════════════════════════
   main.js — All interactive behaviour
   Charles Moudina Varmantchaonala · Portfolio
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav: transparent on dark hero, opaque after ── */
  const topnav = document.getElementById('topnav');
  const homeSection = document.getElementById('home');
  function updateNav() {
    if (!homeSection) return;
    const heroBottom = homeSection.getBoundingClientRect().bottom;
    topnav.classList.toggle('scrolled', heroBottom < 80);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

  /* ── Nav active link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('on'));
        const active = document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
        if (active) active.classList.add('on');
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach(s => spyObserver.observe(s));

  /* ── Burger menu (mobile) ── */
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');
  if (burger && navMenu) {
    burger.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  /* ── Profile photo ── */
  const img = document.getElementById('profile-photo');
  const ph  = document.getElementById('photo-ph');
  if (img && ph) {
    img.addEventListener('load',  () => { img.style.display = 'block'; ph.style.display = 'none'; });
    img.addEventListener('error', () => { img.style.display = 'none';  ph.style.display = 'flex'; });
    if (img.src && img.src !== window.location.href && !img.src.endsWith('/')) {
      img.style.display = 'block'; ph.style.display = 'none';
    }
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 62;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
