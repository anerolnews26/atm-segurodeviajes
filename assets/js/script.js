// --------------------------------------------
// LANGUAGE TOGGLE
// --------------------------------------------

const toggleBtn = document.getElementById("lang-toggle");
const html = document.documentElement;

let currentLang = localStorage.getItem("site-lang") || "es";

// Apply saved language
applyLanguage(currentLang);

toggleBtn.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("site-lang", currentLang);
    applyLanguage(currentLang);
});

function applyLanguage(lang) {
    html.setAttribute("lang", lang);

    document.querySelectorAll("[data-es]").forEach(el => {
        el.textContent = lang === "es" ? el.dataset.es : el.dataset.en;
    });

    toggleBtn.textContent = lang === "es" ? "EN" : "ES";
}


// --------------------------------------------
// SOFT FADE-IN ANIMATION
// --------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity .6s ease";
        document.body.style.opacity = "1";
    }, 50);
});
