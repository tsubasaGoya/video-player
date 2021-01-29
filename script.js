const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('playBtn');
const volumeIcon = document.getElementById('volumeIcon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}
// Event Listener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update progress bar
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Event Listener
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume bar
function adjustVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    volumeBar.style.width = `${volume * 100}%`;
    if (volume > 0.9) { volume = 1; };
    video.volume = volume;
    console.log(volume);
    // Change volume icon
    volumeIcon.className = '';
    volumeIcon.setAttribute('title', 'Mute');
    if (volume > 0.6) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.6 && volume > 0.2) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume < 0.2 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    } else {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }
    lastVolume = volume;
}
// Mute/Unmute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
        volumeBar.style.width = 0;
    } else {
        video.volume = lastVolume;
        volumeIcon.setAttribute('title', 'Mute');
        if (lastVolume > 0.6) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else if (lastVolume < 0.6 && lastVolume > 0.2) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else if (lastVolume < 0.2) {
            volumeIcon.classList.add('fas', 'fa-volume-off');
        }
        volumeBar.style.width = `${lastVolume * 100}%`;
    }
}

// Event Listener
volumeRange.addEventListener('click', adjustVolume);
volumeIcon.addEventListener('click', toggleMute);

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
    console.log('playback', video.playbackRate);
    console.log('set', speed.value);
}

// Event Listener
speed.addEventListener('change', changeSpeed);

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  let fullscreen = false;

  function toggleFullscreen() {
      if (!fullscreen) {
          openFullscreen(video);
      } else {
          closeFullscreen();
      }
  }
// Event Listener
fullscreenBtn.addEventListener('click', toggleFullscreen);