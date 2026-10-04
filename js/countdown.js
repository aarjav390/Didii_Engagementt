(function () {
  function initializeCountdown() {
    const daysValue = document.getElementById('countdown-days');
    const hoursValue = document.getElementById('countdown-hours');
    const minutesValue = document.getElementById('countdown-minutes');
    const secondsValue = document.getElementById('countdown-seconds');
    const message = document.getElementById('countdown-message');

    if (!daysValue || !hoursValue || !minutesValue || !secondsValue || !message) {
      return;
    }

    const weddingDate = new Date('2027-02-25T11:00:00');

    if (Number.isNaN(weddingDate.getTime())) {
      message.textContent = 'Countdown unavailable right now.';
      return;
    }

    const updateCountdown = function () {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (Number.isNaN(difference)) {
        message.textContent = 'Countdown unavailable right now.';
        return;
      }

      if (difference <= 0) {
        daysValue.textContent = '00';
        hoursValue.textContent = '00';
        minutesValue.textContent = '00';
        secondsValue.textContent = '00';
        message.textContent = 'The Celebration Has Begun ❤️';
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      daysValue.textContent = String(days).padStart(2, '0');
      hoursValue.textContent = String(hours).padStart(2, '0');
      minutesValue.textContent = String(minutes).padStart(2, '0');
      secondsValue.textContent = String(seconds).padStart(2, '0');
      message.textContent = 'The celebration awaits us with love.';
    };

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  window.initializeCountdown = initializeCountdown;
})();
