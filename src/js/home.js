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
const slides = document.querySelectorAll(".slider-track img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showSlide(index){

  slides.forEach(slide=>{
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");
}

showSlide(current);

nextBtn.addEventListener("click", ()=>{

  current++;

  if(current >= slides.length){
    current = 0;
  }

  showSlide(current);
});

prevBtn.addEventListener("click", ()=>{

  current--;

  if(current < 0){
    current = slides.length - 1;
  }

  showSlide(current);
});

setInterval(()=>{

  current++;

  if(current >= slides.length){
    current = 0;
  }

  showSlide(current);

}, 5000);