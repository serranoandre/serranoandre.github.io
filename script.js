// Aggiorna l'anno nel footer
document.getElementById('year').textContent = new Date().getFullYear();

// Funzione per mostrare l'immagine nel lightbox
function showImage(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';                
  requestAnimationFrame(() => {                   
    lightbox.classList.add('show');              
  });
}

// Chiudi lightbox cliccando fuori dall’immagine o sulla X
const lightbox = document.getElementById('lightbox');
const closeBtn = document.getElementById('lightbox-close');

function closeLightbox() {
  lightbox.classList.remove('show');               // fade-out
  setTimeout(() => lightbox.style.display = 'none', 300); // dopo la transizione
}

lightbox.addEventListener('click', function(e) {
  if (e.target.id !== 'lightbox-img' && e.target.id !== 'lightbox-close') {
    closeLightbox();
  }
});

closeBtn.addEventListener('click', closeLightbox);
const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('.carousel-thumb');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let index = 0;
const visible = 2; // quante immagini visibili

function updateCarousel() {
  const imgWidth = images[0].offsetWidth; // 120px
  const gap = 10; 
  const offset = -(index * (imgWidth + gap));
  carousel.style.transform = `translateX(${offset}px)`;
}

nextBtn.onclick = () => {
  if (index + visible < images.length) {
    index += visible;
    updateCarousel();
  }
};

prevBtn.onclick = () => {
  if (index - visible >= 0) {
    index -= visible;
    updateCarousel();
  }
};

updateCarousel();

// Trova indice dell'immagine attiva
let currentIndex = 0;

function showImage(img) {
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';
  currentIndex = Array.from(images).indexOf(img);
  requestAnimationFrame(() => {
    lightbox.classList.add('show');
  });
}

// Funzioni per navigare
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById('lightbox-img').src = images[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[currentIndex].src;
}

// Event listeners frecce
document.getElementById('lightbox-next').addEventListener('click', showNext);
document.getElementById('lightbox-prev').addEventListener('click', showPrev);

// Chiudi cliccando fuori o sulla X
lightbox.addEventListener('click', function(e) {
  if (e.target.id !== 'lightbox-img' && e.target.id !== 'lightbox-close' &&
      e.target.id !== 'lightbox-prev' && e.target.id !== 'lightbox-next') {
    closeLightbox();
  }
});
