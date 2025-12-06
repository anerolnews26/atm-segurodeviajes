/* =========================
   script.js — ATM PRO
   ========================= */

/* LANGUAGE TOGGLE */
const langToggle = document.getElementById('lang-toggle');
const savedLang = localStorage.getItem('atm_lang') || 'es';
applyLanguage(savedLang);

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || 'es';
    const next = current === 'es' ? 'en' : 'es';
    localStorage.setItem('atm_lang', next);
    applyLanguage(next);
  });
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) el.textContent = text;
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.textContent = lang === 'es' ? 'ES' : 'EN');
}

/* NAV MOBILE TOGGLE */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });

  // close on link click
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show')));
}

/* LAZY LOAD (IntersectionObserver) */
document.addEventListener('DOMContentLoaded', () => {
  const lazyImgs = document.querySelectorAll('img[data-src], picture source[data-srcset]');

  if ('IntersectionObserver' in window && lazyImgs.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.tagName.toLowerCase() === 'img') {
          if (el.dataset.src) el.src = el.dataset.src;
          if (el.dataset.srcset) el.srcset = el.dataset.srcset;
          el.removeAttribute('data-src');
          el.removeAttribute('data-srcset');
        } else if (el.tagName.toLowerCase() === 'source') {
          if (el.dataset.srcset) el.srcset = el.dataset.srcset;
          el.removeAttribute('data-srcset');
        }
        observer.unobserve(el);
      });
    }, { rootMargin: '200px 0px' });

    lazyImgs.forEach(i => io.observe(i));
  } else {
    // fallback: load immediately
    lazyImgs.forEach(el => {
      if (el.dataset.src) el.src = el.dataset.src;
      if (el.dataset.srcset) el.srcset = el.dataset.srcset;
    });
  }

  // init carousel after images exist
  initGallery();
});

/* GALLERY CAROUSEL */
function initGallery() {
  const gallery = document.querySelector('.gallery-carousel');
  const prev = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');
  if (!gallery) return;

  const step = Math.round(gallery.clientWidth * 0.6);

  if (prev) prev.addEventListener('click', () => gallery.scrollBy({ left: -step, behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => gallery.scrollBy({ left: step, behavior: 'smooth' }));

  // auto-scroll
  let auto = setInterval(() => gallery.scrollBy({ left: step, behavior: 'smooth' }), 3500);
  gallery.addEventListener('mouseenter', () => clearInterval(auto));
  gallery.addEventListener('mouseleave', () => { auto = setInterval(() => gallery.scrollBy({ left: step, behavior: 'smooth' }), 3500); });

  // keyboard
  gallery.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') gallery.scrollBy({ left: step, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') gallery.scrollBy({ left: -step, behavior: 'smooth' });
  });
}
/* FIX PARA MENÚ EN MÓVIL */
document.addEventListener('click', function (e) {
  const nav = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');

  // si haces clic fuera del menú → cerrarlo
  if (nav.classList.contains('show') &&
      !nav.contains(e.target) &&
      e.target !== toggle) {
    nav.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
/* NAV MOBILE ROBUST FIX - agregar al final de script.js */
(function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navMenu || !navToggle) return;

  // Asegura que los enlaces dentro del menú siempre naveguen (cierra primero)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // cerrar menú inmediatamente
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');

      // si el enlace tiene target _blank dejamos que abra; si no, forzamos navegación (evita que otro handler la bloquee)
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      if (href && (!target || target.toLowerCase() !== '_blank')) {
        // pequeña demora para que cierre animación y que el click no sea interceptado
        setTimeout(() => {
          window.location.href = href;
        }, 120);
      }
    }, {passive: true});
  });

  // Cerrar el menú si el usuario toca fuera del mismo (incluye touchstart para móviles)
  function handleOutsideClick(e) {
    if (!navMenu.classList.contains('show')) return;
    const isClickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  document.addEventListener('click', handleOutsideClick, {passive:true});
  document.addEventListener('touchstart', handleOutsideClick, {passive:true});
})();

