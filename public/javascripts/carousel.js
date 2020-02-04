var slides = document.querySelectorAll('#slideshow .slide');
var currentSlide = 0;
slides[currentSlide].className = 'slide showing';
var slideInterval = setInterval(nextSlide,slidespeed); // Čas obměny obrázků v milisekundách

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
}
