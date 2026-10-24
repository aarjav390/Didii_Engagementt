(function () {
  function revealScratchCard() {
    const scratchCard = document.getElementById('scratch-card');
    const canvas = document.getElementById('scratch-canvas');

    if (!scratchCard || !canvas || scratchCard.classList.contains('revealed')) {
      return;
    }

    scratchCard.classList.add('revealed');
    canvas.style.opacity = '0';
    canvas.style.pointerEvents = 'none';
  }

  function getRevealProgress(context, canvas) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = (imageData.data.length / 4);
    let transparentPixels = 0;

    for (let index = 3; index < imageData.data.length; index += 4) {
      if (imageData.data[index] < 32) {
        transparentPixels += 1;
      }
    }

    return transparentPixels / totalPixels;
  }

  function initializeScratchCard() {
    const scratchCard = document.getElementById('scratch-card');
    const canvas = document.getElementById('scratch-canvas');

    if (!scratchCard || !canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    let drawing = false;
    let previousX = 0;
    let previousY = 0;
    let scratchDistance = 0;
    let distanceSinceCheck = 0;

    const resizeCanvas = function () {
      const bounds = scratchCard.getBoundingClientRect();
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(devicePixelRatio, devicePixelRatio);
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#e8d6d1';
      context.fillRect(0, 0, width, height);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = 36;
    };

    const handlePointerDown = function (event) {
      if (scratchCard.classList.contains('revealed')) {
        return;
      }

      drawing = true;
      scratchDistance = 0;
      distanceSinceCheck = 0;
      const rect = canvas.getBoundingClientRect();
      previousX = event.clientX - rect.left;
      previousY = event.clientY - rect.top;

      context.beginPath();
      context.moveTo(previousX, previousY);
      context.lineTo(previousX + 0.01, previousY + 0.01);
      context.stroke();
    };

    const handlePointerMove = function (event) {
      if (!drawing || scratchCard.classList.contains('revealed')) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const distance = Math.hypot(currentX - previousX, currentY - previousY);
      scratchDistance += distance;
      distanceSinceCheck += distance;

      context.beginPath();
      context.moveTo(previousX, previousY);
      context.lineTo(currentX, currentY);
      context.stroke();

      previousX = currentX;
      previousY = currentY;

      if (distanceSinceCheck < 90) {
        return;
      }
      distanceSinceCheck = 0;

      const revealProgress = getRevealProgress(context, canvas);
      const thresholdMet = revealProgress >= 0.42 || scratchDistance > 2100;

      if (thresholdMet) {
        revealScratchCard();
      }
    };

    const handlePointerEnd = function () {
      if (!drawing || scratchCard.classList.contains('revealed')) {
        drawing = false;
        return;
      }

      drawing = false;

      if (getRevealProgress(context, canvas) >= 0.42) {
        revealScratchCard();
      }
    };

    resizeCanvas();

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: false });
    canvas.addEventListener('pointermove', handlePointerMove, { passive: false });
    canvas.addEventListener('pointerup', handlePointerEnd);
    canvas.addEventListener('pointerleave', handlePointerEnd);
    canvas.addEventListener('pointercancel', handlePointerEnd);

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(scratchCard);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }
  }

  window.initializeScratchCard = initializeScratchCard;
})();
