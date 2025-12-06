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
