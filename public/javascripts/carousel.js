/*
var slides = document.querySelectorAll('#slideshow .slide');
var currentSlide = 0;
slides[currentSlide].className = 'slide showing';
var slideInterval = setInterval(nextSlide,slidespeed); // Čas obměny obrázků v milisekundách

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
}
*/
const timer = {
    start: function() {
        slideTimer = setInterval(next, speed);
    },
    stop: function() {
        clearInterval(slideTimer);
    }
}
var slides = document.querySelectorAll('#slideshow .slide');
var videos = document.querySelectorAll('video');
var currentSlide = 0;
slides[currentSlide].className = 'slide showing';
var slideTimer;
var speed = slidespeed;
timer.start();
playCurrentVideo();

// Find all videos and add onEnd listener
for (let i = 0; i < videos.length; i++) {
    videos[i].onended = () => {
        rotateSlides();
        timer.start();
    }
}

function next() {
    let vid = slides[currentSlide].querySelector('video')
    if (!playCurrentVideo()) {
        rotateSlides();
    }
}

function rotateSlides() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
    playCurrentVideo();
}

function playCurrentVideo() {
    let vid = slides[currentSlide].querySelector('video')
    if (vid) {
        timer.stop();
        vid.play()
        return true
    }
}


