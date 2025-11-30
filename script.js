document.getElementById("lang-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-lang");
  const next = current === "es" ? "en" : "es";

  html.setAttribute("data-lang", next);

  document.querySelectorAll("[data-es]").forEach(el => {
    el.innerText = el.getAttribute(`data-${next}`);
  });
});
