const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initializePetals() {
  const petalLayer = document.getElementById('petal-layer');

  if (!petalLayer || prefersReducedMotion.matches) {
    return;
  }

  const count = window.innerWidth < 768 ? 12 : 18;

  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${(Math.random() * 8).toFixed(2)}s`;
    petal.style.animationDuration = `${(Math.random() * 8 + 8).toFixed(2)}s`;
    petal.style.setProperty('--drift', `${(Math.random() * 30 - 15).toFixed(2)}px`);
    petal.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
    petalLayer.appendChild(petal);
  }
}

function initializePhotoBackdrops() {
  const images = document.querySelectorAll('.portrait-inner img, .gallery-item img');

  images.forEach((image) => {
    const backdrop = image.cloneNode();
    backdrop.classList.add('photo-fill');
    backdrop.alt = '';
    backdrop.setAttribute('aria-hidden', 'true');
    image.parentElement.insertBefore(backdrop, image);
  });
}

function openInvitation() {
  const invitationButton = document.getElementById('open-invitation-btn');
  const invitationCard = document.getElementById('envelope-card');
  const openingScreen = document.getElementById('opening-screen');

  if (!invitationButton || !invitationCard || !openingScreen) {
    return;
  }

  invitationButton.disabled = true;
  invitationCard.classList.add('open');

  setTimeout(() => {
    document.body.classList.add('invitation-open');
    openingScreen.classList.add('is-closed');
  }, 500);

  setTimeout(() => {
    if (window.initializeMusic && !document.body.dataset.musicReady) {
      window.initializeMusic();
    }
  }, 700);
}

function initializeApp() {
  initializePetals();
  initializePhotoBackdrops();

  const invitationButton = document.getElementById('open-invitation-btn');
  if (invitationButton) {
    invitationButton.addEventListener('click', openInvitation);
  }

  if (window.initializeScratchCard) {
    window.initializeScratchCard();
  }

  if (window.initializeCountdown) {
    window.initializeCountdown();
  }

  if (window.initializeGallery) {
    window.initializeGallery();
  }

  if (window.initializeMusic) {
    window.initializeMusic();
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);
