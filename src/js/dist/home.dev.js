"use strict";

// MENU MOBILE
var hamburger = document.getElementById("hamburger");
var navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
}); // FECHAR MENU AO CLICAR

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
}); // NAVBAR SCROLL

var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
//# sourceMappingURL=home.dev.js.map
