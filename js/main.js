/**
 * main.js — Zona Ninja
 * Menú hamburguesa + Smooth scroll + Fade-in on scroll
 * Sin dependencias externas. ~60 líneas.
 */

(function () {
  "use strict";

  /* ── Menú hamburguesa ─────────────────────────────────── */
  const btnHamburger = document.getElementById("btn-hamburger");
  const mobileNav    = document.getElementById("mobile-nav");
  const iconMenu     = document.getElementById("icon-menu");
  const iconClose    = document.getElementById("icon-close");

  if (btnHamburger && mobileNav) {
    btnHamburger.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      iconMenu.style.display  = isOpen ? "none"  : "block";
      iconClose.style.display = isOpen ? "block" : "none";
      btnHamburger.setAttribute("aria-expanded", isOpen);
    });
  }

  /* Cierra el menú al hacer click en un enlace del nav móvil */
  document.querySelectorAll(".mobile-nav__link, .mobile-nav .btn-cta").forEach((el) => {
    el.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      if (iconMenu && iconClose) {
        iconMenu.style.display  = "block";
        iconClose.style.display = "none";
      }
      btnHamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ── Smooth scroll para todos los links de anclaje ───── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ── Fade-in al scroll (IntersectionObserver) ─────────── */
  const fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // sólo una vez
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    /* Fallback para navegadores antiguos */
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  /* ── Header shrink on scroll ──────────────────────────── */
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 10
        ? "0 2px 20px rgba(0,0,0,0.6)"
        : "none";
    }, { passive: true });
  }

})();
