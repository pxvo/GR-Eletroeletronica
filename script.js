/* ===========================================================================
   GR Eletroeletrônica - script.js
   Com comentários explicativos por bloco (HEADER, NAV, TESTIMONIALS, WHATSAPP)
   =========================================================================== */

/* ===========================
   DOM READY
   - usa defer no HTML, então o script roda quando DOM estiver pronto
   =========================== */

/* HEADER / NAV
   - controla o botão hamburger e alterna a exibição do menu em mobile.
*/
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if(navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    mainNav.classList.toggle('open');
    // anima o ícone hamburger para um "x"
    navToggle.querySelector('.hamburger').classList.toggle('open');
  });
}

/* A rotina abaixo transforma o ícone hamburger em X (apenas visual) */
const hamburger = document.querySelector('.hamburger');
if(hamburger){
  hamburger.addEventListener('transitionend', ()=>{/* placeholder se quiser animar mais */});
}

/* ===========================
   RODAPÉ / ANO DINÂMICO
   - insere o ano atual no footer
   =========================== */
const yearEl = document.getElementById('year');
if(yearEl){
  yearEl.textContent = new Date().getFullYear();
}

/* ===========================
   TESTIMONIALS SLIDER
   - slider simples que muda o depoimento ativo
   - setInterval faz autoplay; botões permitem navegação manual
   =========================== */
(function testimonialsSlider(){
  const slides = Array.from(document.querySelectorAll('.testi'));
  const prevBtn = document.querySelector('.testi-prev');
  const nextBtn = document.querySelector('.testi-next');
  let current = 0;
  const total = slides.length;
  let autoTimer = null;
  const interval = 6000; // tempo entre trocas automáticas (6s)

  function show(index){
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current = index;
  }
  function next(){
    show((current + 1) % total);
  }
  function prev(){
    show((current - 1 + total) % total);
  }

  // ligar botões
  if(nextBtn) nextBtn.addEventListener('click', ()=> { next(); resetAuto(); });
  if(prevBtn) prevBtn.addEventListener('click', ()=> { prev(); resetAuto(); });

  // autoplay
  function startAuto(){ autoTimer = setInterval(next, interval); }
  function resetAuto(){ clearInterval(autoTimer); startAuto(); }

  if(total > 1){
    show(0);
    startAuto();
  } else if(total === 1){
    show(0);
  }
})();

/* ===========================
   WHATSAPP FLOATING BUTTON
   - efeito visual contínuo via CSS (anel e leve elevação)
   - tooltip "Mais informações" aparece a cada 5s
   - o texto aparece por um curto período e depois some (ciclo)
   =========================== */
(function whatsappTooltipCycle(){
  const tooltip = document.querySelector('.whatsapp-tooltip');
  const btn = document.getElementById('whatsapp-btn');

  // configuração: intervalo entre aparições (em ms) e duração visível (em ms)
  const showInterval = 5000; // a cada 5 segundos
  const visibleDuration = 2500; // aparece por 2.5s

  if(!tooltip || !btn) return;

  // Função para exibir e automaticamente ocultar o tooltip
  function showTooltipOnce(){
    tooltip.classList.add('visible');
    // remove após visibleDuration
    setTimeout(()=> tooltip.classList.remove('visible'), visibleDuration);
  }

  // Mostrar imediatamente no carregamento e depois a cada intervalo
  showTooltipOnce();
  const cycle = setInterval(showTooltipOnce, showInterval);

  // Se o usuário focar/clicar no botão, ocultamos tooltip e pausamos por um tempo para não incomodar
  btn.addEventListener('click', () => {
    tooltip.classList.remove('visible');
    // opcional: pausar o ciclo por 10s após clique (melhora UX)
    clearInterval(cycle);
    setTimeout(()=>{ setInterval(showTooltipOnce, showInterval); }, 10000);
  });

  // quando o usuário passar o mouse no botão, mostramos o tooltip (UX adicional)
  btn.addEventListener('mouseenter', ()=> tooltip.classList.add('visible'));
  btn.addEventListener('mouseleave', ()=> tooltip.classList.remove('visible'));
})();

/* ===========================
   A11Y / KEYBOARD NAVIGATION
   - permite fechar o menu mobile com Escape
   =========================== */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(mainNav && mainNav.classList.contains('open')){
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ===========================
   Observações finais (comentário)
   - substitua os placeholders (logo, número WhatsApp, endereços e imagens)
   - se quiser eu adiciono animação mais sofisticada, um slider de projetos com lightbox,
     ou exporto o logo do PDF para PNG/SVG aqui.
   =========================== */
