// ----------------------
// Aggiorna l'anno nel footer
// ----------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ----------------------
// Lightbox
// ----------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('lightbox-close');
const nextBtnLightbox = document.getElementById('lightbox-next');
const prevBtnLightbox = document.getElementById('lightbox-prev');

let currentImages = [];  // immagini del carousel corrente
let currentIndex = 0;

// Mostra l'immagine nel lightbox
function showImage(img) {
  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';

  // Trova tutte le immagini nel carousel della foto cliccata
  const carousel = img.closest('.carousel');
  currentImages = Array.from(carousel.querySelectorAll('.carousel-thumb'));

  // Indice immagine corrente
  currentIndex = currentImages.indexOf(img);

  requestAnimationFrame(() => {
    lightbox.classList.add('show');
  });
}

// Navigazione lightbox
function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

// Chiudi lightbox
function closeLightbox() {
  lightbox.classList.remove('show');
  setTimeout(() => lightbox.style.display = 'none', 300);
}

// Event listener
closeBtn.addEventListener('click', closeLightbox);
nextBtnLightbox.addEventListener('click', showNext);
prevBtnLightbox.addEventListener('click', showPrev);

lightbox.addEventListener('click', function(e) {
  if (!['lightbox-img','lightbox-close','lightbox-prev','lightbox-next'].includes(e.target.id)) {
    closeLightbox();
  }
});

// ----------------------
// Carousel
// ----------------------
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const images = carousel.querySelectorAll('.carousel-thumb');
  const prevBtn = wrapper.querySelector('.carousel-btn:first-of-type');
  const nextBtn = wrapper.querySelector('.carousel-btn:last-of-type');
  
  let index = 0;
  const visible = 2; // immagini visibili

  function updateCarousel() {
    const imgWidth = images[0].offsetWidth;
    const gap = parseInt(getComputedStyle(carousel).gap) || 15;
    const offset = -(index * (imgWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Event listener pulsanti
  nextBtn.addEventListener('click', () => {
    if (index + visible < images.length) {
      index += visible;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index - visible >= 0) {
      index -= visible;
      updateCarousel();
    }
  });

  // Inizializza carosello
  updateCarousel();

  // Aggiungi evento per lightbox
  images.forEach(img => {
    img.addEventListener('click', () => showImage(img));
  });
});
