// -------------------------------
// CAMBIO DE IDIOMA ES / EN
// -------------------------------

// Detectar idioma guardado o usar ES por defecto
let currentLang = localStorage.getItem("lang") || "es";

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {

  const langButton = document.getElementById("lang-toggle");

  if (langButton) {
    // Mostrar el botón dependiendo del idioma actual
    langButton.textContent = currentLang.toUpperCase() === "ES" ? "ES / EN" : "EN / ES";

    // Evento de cambio de idioma
    langButton.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      localStorage.setItem("lang", currentLang);
      applyTranslations();
    });
  }

  // Aplicar el idioma al cargar
  applyTranslations();
});


// -------------------------------
// FUNCIÓN QUE APLICA LAS TRADUCCIONES
// -------------------------------
function applyTranslations() {
  document.documentElement.setAttribute("data-lang", currentLang);

  // Seleccionar todos los elementos traducibles
  const translatable = document.querySelectorAll("[data-es][data-en]");

  translatable.forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // Actualizar el texto del botón si existe
  const langButton = document.getElementById("lang-toggle");
  if (langButton) {
    langButton.textContent = currentLang === "es" ? "ES / EN" : "EN / ES";
  }
}
