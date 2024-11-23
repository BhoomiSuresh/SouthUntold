let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  let h2 = document.querySelector("h2");
  if(slideIndex==0){
    h2.innerText = "Kerala";
    h2.style.color = "#ffe4c4";
  }
  else{
    h2.innerText = "";
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1};   
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3500); // Change image every 2 seconds
}

function storeContent(content){
  localStorage.setItem('content',content);
  window.location.href='booking.html';
}