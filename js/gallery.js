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
    const image = galleryItems[currentIndex].querySelector('img');

    if (!image) {
      return;
    }

    lightboxImage.style.backgroundImage = `url("${image.src}")`;
    lightboxImage.setAttribute('aria-label', image.alt);
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

  function initializeVenueGallery() {
    const venueGallery = document.getElementById('venue-gallery');

    if (!venueGallery) {
      return;
    }

    const images = Array.from(venueGallery.querySelectorAll('img'));
    const count = venueGallery.querySelector('.venue-gallery-count');
    const previousButton = venueGallery.querySelector('.venue-gallery-nav.prev');
    const nextButton = venueGallery.querySelector('.venue-gallery-nav.next');

    if (!images.length || !count || !previousButton || !nextButton) {
      return;
    }

    let currentIndex = 0;

    const showImage = function (index) {
      currentIndex = (index + images.length) % images.length;
      images.forEach((image, imageIndex) => {
        image.hidden = imageIndex !== currentIndex;
      });
      count.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    previousButton.addEventListener('click', () => showImage(currentIndex - 1));
    nextButton.addEventListener('click', () => showImage(currentIndex + 1));
    showImage(currentIndex);
  }

  function initializeGallery() {
    initializeVenueGallery();
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
