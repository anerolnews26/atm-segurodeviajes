/* ------------------------------ */
/* LANGUAGE SYSTEM ES / EN        */
/* ------------------------------ */
const langToggle = document.getElementById("lang-toggle");

// Load saved language
let currentLang = localStorage.getItem("atm-lang") || "es";

// Apply on load
applyTranslations(currentLang);

// Switch language
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("atm-lang", currentLang);
    applyTranslations(currentLang);
});

/* Main translation function */
function applyTranslations(lang) {
    document.querySelectorAll("[data-es]").forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Optional: swap placeholder attributes
    document.querySelectorAll("[data-es-placeholder]").forEach(el => {
        el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", lang);
}

/* ------------------------------ */
/* PERFORMANCE OPTIMIZATION       */
/* ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    // Lazy load images
    document.querySelectorAll("img").forEach(img => {
        img.loading = "lazy";
    });

    // Remove unused nodes (cleanup)
    console.log("ATM website optimized and language applied.");
});
const gallery = document.querySelector('.gallery-carousel');

let autoScroll = setInterval(() => {
    gallery.scrollBy({ left: 260, behavior: 'smooth' });
}, 3500);

gallery.addEventListener('mouseenter', () => clearInterval(autoScroll));
gallery.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
        gallery.scrollBy({ left: 260, behavior: 'smooth' });
    }, 3500);
});

