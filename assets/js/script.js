// ------------------------------
// CAMBIO DE IDIOMA ES / EN
// ------------------------------

// Detectar idioma guardado o usar ES por defecto
let currentLang = localStorage.getItem("lang") || "es";

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {

  const langButton = document.getElementById("lang-toggle");

  if (langButton) {
    // Mostrar el idioma alternativo
    langButton.textContent = currentLang === "es" ? "EN" : "ES";

    // Evento de cambio de idioma
    langButton.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      localStorage.setItem("lang", currentLang);
      langButton.textContent = currentLang === "es" ? "EN" : "ES";
      applyTranslations();
    });
  }

  // Aplicar traducciones cuando carga
  applyTranslations();
});


// ------------------------------
// FUNCIÓN PARA TRADUCIR TEXTOS
// ------------------------------
function applyTranslations() {
  document.querySelectorAll("[data-es]").forEach((el) => {
    const text = currentLang === "es" ? el.getAttribute("data-es") : el.getAttribute("data-en");
    if (text) el.innerHTML = text;
  });
}
