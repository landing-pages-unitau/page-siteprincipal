/* ==========================================
   VALE WEB SOLUTIONS — home.js
   Funções: navbar mobile, slider, formulário
========================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // NAVBAR MOBILE
  // ========================================
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const navbar     = document.getElementById('navbar');

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em qualquer link do menu
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // Fecha com tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger && hamburger.classList.contains('active')) {
      closeMenu();
    }
  });

  // ========================================
  // SLIDER
  // ========================================
  var track    = document.getElementById('sliderTrack');
  var dotsWrap = document.getElementById('sliderDots');

  if (track) {
    var slides     = track.querySelectorAll('img');
    var total      = slides.length;
    var current    = 0;
    var autoTimer  = null;
    var startX     = 0;
    var isDragging = false;

    // Cria dots
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir para imagem ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.slider-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      updateDots();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Botões
    var btnPrev = document.querySelector('.slider-btn.prev');
    var btnNext = document.querySelector('.slider-btn.next');
    if (btnPrev) btnPrev.addEventListener('click', function () { resetAuto(); prev(); });
    if (btnNext) btnNext.addEventListener('click', function () { resetAuto(); next(); });

    // Auto-play
    function startAuto() {
      autoTimer = setInterval(next, 4000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    startAuto();

    // Touch / swipe
    var container = document.querySelector('.slider-container');
    if (container) {
      container.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoTimer);
      }, { passive: true });

      container.addEventListener('touchend', function (e) {
        if (!isDragging) return;
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          diff > 0 ? next() : prev();
        }
        isDragging = false;
        startAuto();
      }, { passive: true });
    }

    // Pausa ao focar nos botões
    [btnPrev, btnNext].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('focus', function () { clearInterval(autoTimer); });
      btn.addEventListener('blur', startAuto);
    });
  }

  // ========================================
  // FORMULÁRIO — feedback simples
  // ========================================
  var btnSubmit = document.getElementById('btnSubmit');

  if (btnSubmit) {
    btnSubmit.addEventListener('click', function (e) {
      var nome  = document.getElementById('nome');
      var email = document.getElementById('email');

      if (!nome || !nome.value.trim()) {
        alert('Por favor, preencha o campo Nome.');
        if (nome) nome.focus();
        return;
      }

      if (!email || !email.value.trim()) {
        alert('Por favor, preencha o campo E-mail.');
        if (email) email.focus();
        return;
      }

      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email.value.trim())) {
        alert('Por favor, insira um e-mail válido.');
        email.focus();
        return;
      }

      // Feedback visual
      var original = btnSubmit.innerHTML;
      btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem enviada!';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '.8';

      setTimeout(function () {
        btnSubmit.innerHTML = original;
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '';
      }, 3500);
    });
  }

  // ========================================
  // NAVBAR — sombra ao rolar
  // ========================================
  if (navbar) {
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var shouldScroll = window.scrollY > 10;
      if (shouldScroll !== scrolled) {
        scrolled = shouldScroll;
        navbar.style.boxShadow = scrolled
          ? '0 4px 20px rgba(0,0,0,.08)'
          : 'none';
      }
    }, { passive: true });
  }

});