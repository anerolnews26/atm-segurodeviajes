
// Traducción muy simple: busca todos los elementos con atributos data-es y data-en
(function(){
  const toggle = document.getElementById('lang-toggle');
  function setLang(lang){
    document.documentElement.lang = (lang==='en')? 'en':'es';
    document.querySelectorAll('[data-es]').forEach(el=>{
      el.textContent = (lang==='en')? el.getAttribute('data-en') : el.getAttribute('data-es');
    });
    // guarda preferencia
    localStorage.setItem('site-lang',lang);
  }
  const saved = localStorage.getItem('site-lang') || (navigator.language && navigator.language.startsWith('en')? 'en':'es');
  setLang(saved);
  toggle && toggle.addEventListener('click',()=> setLang(document.documentElement.lang==='en' ? 'es' : 'en'));
})();
