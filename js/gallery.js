(function () {
  let galleryItems = [];
  let currentIndex = 0;

  function openLightbox(index) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    if (!lightbox || !lightboxImage || !galleryItems.length) {
      return;
    }

    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const gradients = [
      'linear-gradient(135deg, rgba(227, 190, 183, 0.4), rgba(255,255,255,0.08))',
      'linear-gradient(135deg, rgba(201, 173, 130, 0.48), rgba(255,255,255,0.08))',
      'linear-gradient(135deg, rgba(170, 135, 113, 0.42), rgba(255,255,255,0.1))',
      'linear-gradient(135deg, rgba(201, 149, 155, 0.42), rgba(255,255,255,0.08))',
      'linear-gradient(135deg, rgba(184, 128, 141, 0.42), rgba(255,255,255,0.08))',
      'linear-gradient(135deg, rgba(139, 120, 99, 0.38), rgba(255,255,255,0.1))'
    ];

    lightboxImage.style.backgroundImage = gradients[currentIndex % gradients.length];
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');

    if (!lightbox) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function moveLightbox(step) {
    if (!galleryItems.length) {
      return;
    }

    openLightbox(currentIndex + step);
  }

  function initializeGallery() {
    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    if (!galleryItems.length) {
      return;
    }

    const lightbox = document.getElementById('gallery-lightbox');
    const closeButton = document.getElementById('lightbox-close');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index));
    });

    if (closeButton) {
      closeButton.addEventListener('click', closeLightbox);
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => moveLightbox(-1));
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => moveLightbox(1));
    }

    if (lightbox) {
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (event) => {
      if (!lightbox || !lightbox.classList.contains('is-open')) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowRight') {
        moveLightbox(1);
      }

      if (event.key === 'ArrowLeft') {
        moveLightbox(-1);
      }
    });
  }

  window.initializeGallery = initializeGallery;
})();
