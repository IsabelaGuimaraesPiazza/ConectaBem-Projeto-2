// js/app.js — versão confiável para o menu/hamburger e comportamento global
(function () {
  'use strict';

  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return Array.from(document.querySelectorAll(sel)); }

  document.addEventListener('DOMContentLoaded', () => {
    // Seletores esperados no header (padronize os headers das 3 páginas com a mesma estrutura)
    let hamburger = q('.hamburger');
    const header = q('.header') || q('header');
    let menuNav = q('.menu-nav');

    // Se não existir hamburger no HTML, cria um (evita divergências entre páginas)
    if (!hamburger && header) {
      hamburger = document.createElement('button');
      hamburger.className = 'hamburger';
      hamburger.setAttribute('aria-label', 'Abrir menu');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '<span aria-hidden="true">☰</span>';
      // tenta inserir depois do título
      const inner = header.querySelector('.header-inner') || header;
      inner.appendChild(hamburger);
    }

    // Se não existir menuNav, tenta criar a estrutura mínima
    if (!menuNav && header) {
      const fallbackNav = document.createElement('nav');
      fallbackNav.className = 'menu-nav';
      fallbackNav.innerHTML = `<ul class="menu">
        <li><a href="index.html">Início</a></li>
        <li><a href="projetos.html">Projetos</a></li>
        <li><a href="cadastro.html">Cadastro</a></li>
      </ul>`;
      header.appendChild(fallbackNav);
      menuNav = fallbackNav;
    }

    if (!hamburger || !menuNav) {
      // se faltou algo, escreve no console para debug (não quebra)
      console.warn('Hamburger ou menuNav não encontrados — verifique header HTML.');
      return;
    }

    const menu = menuNav.querySelector('.menu');

    // Toggle robusto: adiciona/remover classe .ativo no container .menu-nav
    function openMenu() {
      menuNav.classList.add('ativo');
      hamburger.setAttribute('aria-expanded', 'true');
      // lock body scroll (mobile)
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      menuNav.classList.remove('ativo');
      hamburger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    function toggleMenu() {
      if (menuNav.classList.contains('ativo')) closeMenu();
      else openMenu();
    }

    // Clique no hamburger
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Fecha ao clicar em link do menu
    qa('.menu a').forEach(a => {
      a.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Fecha clicando fora do menu (popup)
    document.addEventListener('click', (e) => {
      if (!menuNav.classList.contains('ativo')) return;
      // se clique for dentro do menu ou no hamburger, ignora
      if (menuNav.contains(e.target) || hamburger.contains(e.target)) return;
      closeMenu();
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Ao redimensionar para desktop, força fechamento e remove estilos inline
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });

    // Pequeno fallback visual: se CSS estiver escondendo .menu, garante que .menu-nav.ativo mostra.
    // (Não modifica estilos permanentes, só garante visibilidade caso haja conflito)
    const observer = new MutationObserver(() => {
      if (menuNav.classList.contains('ativo')) {
        menuNav.style.zIndex = '9999';
      } else {
        menuNav.style.zIndex = '';
      }
    });
    observer.observe(menuNav, { attributes: true, attributeFilter: ['class'] });

    // Debug helper (apenas se você quiser testar no celular; desative em produção)
    window.__conecta_debug_menu = { hamburger, menuNav, menu, openMenu, closeMenu };
  });
})();
function showToast(msg) {
  const toast = document.querySelector(".toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 3000);
}
function openModal() {
  document.getElementById("modal-bg").classList.add("show");
}

function closeModal() {
  document.getElementById("modal-bg").classList.remove("show");
}
function openModal() {
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}