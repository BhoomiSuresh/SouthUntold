let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselSlides = document.querySelector('.carousel-slides');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const firstSlideClone = slides[0].cloneNode(true);
carouselSlides.appendChild(firstSlideClone);

function goToNextSlide() {
  if (currentSlideIndex === totalSlides - 1) {
    carouselSlides.style.transition = 'none';
    currentSlideIndex = 0; 
    updateCarousel();
    
    setTimeout(() => {
      carouselSlides.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else {
    currentSlideIndex++;
    updateCarousel();
  }
}

function goToPrevSlide() {
  if (currentSlideIndex === 0) {
    carouselSlides.style.transition = 'none';
    currentSlideIndex = totalSlides - 1; 
    updateCarousel();
    
    setTimeout(() => {
      carouselSlides.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  } else {
    currentSlideIndex--;
    updateCarousel();
  }
}


function updateCarousel() {
  carouselSlides.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  
  let h1 = document.querySelector("h1");
  
  if (currentSlideIndex == 0) {
    h1.innerText = "Karnataka";
    h1.style.color = "#ffe4c4";  
  } else {
    h1.innerText = "";
  }
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', goToNextSlide);
prevButton.addEventListener('click', goToPrevSlide);

// Automatically move to next slide every 5 seconds
setInterval(goToNextSlide, 3500);


function storeContent(content){
  localStorage.setItem('content',content);
  window.location.href='booking.html';
}



