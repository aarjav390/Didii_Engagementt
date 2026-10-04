(function () {
  function initializeMusic() {
    const toggleButton = document.getElementById('music-toggle');
    const audio = document.getElementById('background-music');

    if (!toggleButton || !audio || toggleButton.dataset.musicBound === 'true') {
      return;
    }

    toggleButton.dataset.musicBound = 'true';
    document.body.dataset.musicReady = 'true';

    const updateToggle = function (isPlaying) {
      toggleButton.classList.toggle('is-playing', isPlaying);
      toggleButton.setAttribute('aria-pressed', String(isPlaying));
      toggleButton.title = isPlaying ? 'Pause music' : 'Play music';
    };

    const musicUrl = 'assets/music/wedding.mp3';

    const playMusic = async function () {
      if (!audio.src) {
        audio.src = musicUrl;
        audio.load();
      }

      try {
        await audio.play();
        updateToggle(true);
      } catch (error) {
        updateToggle(false);
      }
    };

    const pauseMusic = function () {
      audio.pause();
      updateToggle(false);
    };

    toggleButton.addEventListener('click', async function () {
      if (audio.paused) {
        await playMusic();
      } else {
        pauseMusic();
      }
    });

    audio.addEventListener('error', function () {
      toggleButton.style.display = 'none';
    });

    audio.addEventListener('ended', function () {
      updateToggle(false);
    });

    if (document.body.classList.contains('invitation-open')) {
      setTimeout(function () {
        if (!audio.paused) {
          return;
        }
        playMusic();
      }, 700);
    }
  }

  window.initializeMusic = initializeMusic;
})();
