// MENU MOBILE
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

});

// FECHAR MENU AO CLICAR
document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    hamburger.classList.remove("active");
    navLinks.classList.remove("active");

  });

});

// NAVBAR SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 40){

    navbar.classList.add("scrolled");

  }else{

    navbar.classList.remove("scrolled");

  }

});