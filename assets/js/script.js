/* ===========================
   script.js — ATM PRO
   =========================== */

/* ---- LANGUAGE TOGGLE ---- */
const langToggleBtns = document.querySelectorAll('#lang-toggle, .lang-btn');
const savedLang = localStorage.getItem('atm_lang') || 'es';
applyLanguage(savedLang);

langToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || 'es';
    const next = current === 'es' ? 'en' : 'es';
    localStorage.setItem('atm_lang', next);
    applyLanguage(next);
  });
});

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) el.textContent = text;
  });
  // update visible language button text
  document.querySelectorAll('.lang-btn, #lang-toggle').forEach(b => {
    b.textContent = lang === 'es' ? 'ES' : 'EN';
  });
}

/* ---- NAV MOBILE TOGGLE ---- */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.style.display = expanded ? '' : 'flex';
  });
}

/* ---- LAZYLOAD IMAGES (IntersectionObserver) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src], picture source[data-srcset]');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach(img => io.observe(img));
  } else {
    // fallback: load all
    lazyImages.forEach(el => {
      if (el.dataset.src) el.src = el.dataset.src;
      if (el.dataset.srcset) el.srcset = el.dataset.srcset;
    });
  }
});

/* ---- GALLERY CARRUSEL (controls + auto scroll) ---- */
const gallery = document.querySelector('.gallery-carousel');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

if (gallery) {
  // scroll amount
  const step = 300;
  // controls
  if (prevBtn) prevBtn.addEventListener('click', () => gallery.scrollBy({ left: -step, behavior: 'smooth' }));
  if (nextBtn) nextBtn.addEventListener('click', () => gallery.scrollBy({ left: step, behavior: 'smooth' }));

  // auto scroll
  let auto = setInterval(() => { gallery.scrollBy({ left: step, behavior: 'smooth' }); }, 3500);
  gallery.addEventListener('mouseenter', () => clearInterval(auto));
  gallery.addEventListener('mouseleave', () => {
    auto = setInterval(() => { gallery.scrollBy({ left: step, behavior: 'smooth' }); }, 3500);
  });

  // accessible keyboard navigation
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') gallery.scrollBy({ left: step, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') gallery.scrollBy({ left: -step, behavior: 'smooth' });
  });
}

/* ---- PERFORMANCE HINT: prevent layout shift by reserving aspect ratio --- */
/* Not needed here in JS because we set width/height attributes in HTML, but keep this for safety */
// ----------------------------------------
// NAV MOBILE TOGGLE
// ----------------------------------------
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Cerrar al hacer clic en un enlace
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}
