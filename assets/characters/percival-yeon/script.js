const BASE = document.body.dataset.base;
const MUSIC = `${BASE}/music`;
const COVER = `${MUSIC}/cover`;
const audio = document.getElementById('audio');
const playlistContainer = document.getElementById('playlist');
const coverArt = document.getElementById('cover-art');
const trackInfo = document.getElementById('track-info');
const timeStamp = document.getElementById('time-stamp');
const volumeSlider = document.getElementById('volume-slider');
const playPauseBtn = document.getElementById('play-pause');
const shuffleBtn = document.getElementById('shuffle-btn');
const muteBtn = document.getElementById('mute-btn');

let currentIndex = 0;
let isShuffled = false;

const songs = [
  {
    title: 'Tear in My Heart',
    artist: 'Twenty One Pilots',
    src: 'assets/characters/perciva-yeon/music/Tear in My Heart - Twenty One Pilots.mp3',
    cover: 'assets/characters/perciva-yeon/music/cover/Tear in My Heart - Twenty One Pilots.jpeg',
  },
  {
    title: "Boys Don't Cry (Single Version)",
    artist: 'The Cure',
    src: 'assets/characters/perciva-yeon/music/Boys Don_t Cry - Single Version - The Cure.mp3',
    cover:
      'assets/characters/perciva-yeon/music/cover/Boys Don_t Cry - Single Version - The Cure.jpeg',
  },
  {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    src: 'assets/characters/perciva-yeon/music/Smells Like Teen Spirit - Nirvana.mp3',
    cover: 'assets/characters/perciva-yeon/music/cover/Smells Like Teen Spirit - Nirvana.jpeg',
  },
  {
    title: 'Sweater Weather',
    artist: 'The Neighbourhood',
    src: 'assets/characters/perciva-yeon/music/Sweater Weather - The Neighbourhood.mp3',
    cover: 'assets/characters/perciva-yeon/music/cover/Sweater Weather - The Neighbourhood.jpeg',
  },
];

// Sort songs alphabetically
songs.sort((a, b) => a.title.localeCompare(b.title));

// Generate playlist
songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.classList.add('track');
  if (index === 0) div.classList.add('active');
  div.dataset.index = index;
  div.textContent = `✧  ${song.title}`;
  playlistContainer.appendChild(div);
  div.addEventListener('click', () => playTrack(index));
});

// Initialize volume
audio.volume = 0.1;
volumeSlider.value = audio.volume;

// Play a track
function playTrack(index) {
  currentIndex = index;
  const song = songs[index];
  const srcPath = song.src.replace(/^assets\/characters\/perciva-yeon\//, '');
  const coverPath = song.cover.replace(/^assets\/characters\/perciva-yeon\//, '');
  audio.src = `${BASE}/${srcPath}`;
  coverArt.src = `${BASE}/${coverPath}`;
  trackInfo.textContent = `✦ ${song.title} – ${song.artist} ✦`;

  document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
  document.querySelector(`.track[data-index="${index}"]`).classList.add('active');

  audio.play().catch(() => console.log('Autoplay blocked.'));
  updatePlayPauseBtn();
}

// Update play/pause button text
function updatePlayPauseBtn() {
  playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
}

// Play/pause button
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
  updatePlayPauseBtn();
});

// Shuffle button
shuffleBtn.addEventListener('click', () => {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle('active', isShuffled);
});

// Next track
function nextTrack() {
  if (isShuffled) {
    let next;
    do {
      next = Math.floor(Math.random() * songs.length);
    } while (next === currentIndex && songs.length > 1);
    playTrack(next);
  } else {
    playTrack((currentIndex + 1) % songs.length);
  }
}

// Previous track
function prevTrack() {
  playTrack((currentIndex - 1 + songs.length) % songs.length);
}

// Audio ended
audio.addEventListener('ended', nextTrack);

// Keyboard / custom buttons
const controlsContainer = document.createElement('div');
controlsContainer.style.display = 'flex';
controlsContainer.style.justifyContent = 'center';
controlsContainer.style.marginTop = '5px';
const prevBtn = document.createElement('button');
prevBtn.textContent = '⏮';
prevBtn.style.marginRight = '5px';
prevBtn.addEventListener('click', prevTrack);
const nextBtn = document.createElement('button');
nextBtn.textContent = '⏭';
nextBtn.style.marginLeft = '5px';
nextBtn.addEventListener('click', nextTrack);

playPauseBtn.parentNode.insertBefore(prevBtn, playPauseBtn);
playPauseBtn.parentNode.insertBefore(nextBtn, playPauseBtn.nextSibling);

// Update timestamp
audio.addEventListener('timeupdate', () => {
  const formatTime = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
});

// Attempt autoplay on page load
window.addEventListener('DOMContentLoaded', () => {
  playTrack(0); // Try to play first track automatically
});

const overlay = document.getElementById('start-overlay');
overlay.addEventListener('click', () => {
  playTrack(0); // start first track
  overlay.style.display = 'none'; // hide overlay
});

// Optional: update mute button if volume slider goes to 0
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  if (audio.volume === 0) {
    audio.muted = true;
    muteBtn.textContent = '🕨';
    muteBtn.classList.add('muted');
  } else if (audio.muted) {
    audio.muted = false;
    muteBtn.textContent = '🕪';
    muteBtn.classList.remove('muted');
  }
});
