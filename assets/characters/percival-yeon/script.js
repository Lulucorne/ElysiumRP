const BASE = document.body.dataset.base || '';
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
    src: 'assets/characters/percival-yeon/music/Tear in My Heart - Twenty One Pilots.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Tear in My Heart - Twenty One Pilots.jpeg',
  },
  {
    title: "Boys Don't Cry (Single Version)",
    artist: 'The Cure',
    src: 'assets/characters/percival-yeon/music/Boys Don_t Cry - Single Version - The Cure.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Boys Don_t Cry - Single Version - The Cure.jpeg',
  },
  {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    src: 'assets/characters/percival-yeon/music/Smells Like Teen Spirit - Nirvana.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Smells Like Teen Spirit - Nirvana.jpeg',
  },
  {
    title: 'Sweater Weather',
    artist: 'The Neighbourhood',
    src: 'assets/characters/percival-yeon/music/Sweater Weather - The Neighbourhood.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Sweater Weather - The Neighbourhood.jpeg',
  },
];

// Sort songs alphabetically
songs.sort((a, b) => a.title.localeCompare(b.title));

// Build playlist
songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.classList.add('track');
  if (index === 0) div.classList.add('active');
  div.dataset.index = index;
  div.textContent = `✧  ${song.title}`;
  playlistContainer.appendChild(div);
  div.addEventListener('click', () => playTrack(index));
});

// Init volume safely
audio.volume = 0.1;
if (volumeSlider) volumeSlider.value = String(audio.volume);

// ====== CORE ======
function playTrack(index) {
  currentIndex = index;
  const song = songs[index];

  const srcPath = song.src.replace(/^assets\/characters\/percival-yeon\//, '');
  const coverPath = song.cover.replace(/^assets\/characters\/percival-yeon\//, '');

  audio.src = `${BASE}/${srcPath}`;
  coverArt.src = `${BASE}/${coverPath}`;
  trackInfo.textContent = `✦ ${song.title} – ${song.artist} ✦`;

  document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
  const active = document.querySelector(`.track[data-index="${index}"]`);
  if (active) active.classList.add('active');

  audio.play().catch(() => {
    updatePlayPauseBtn();
  });
  updatePlayPauseBtn();
}

function updatePlayPauseBtn() {
  playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
}

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

function prevTrack() {
  playTrack((currentIndex - 1 + songs.length) % songs.length);
}

// ====== UI EVENTS ======

// Play/pause
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
  updatePlayPauseBtn();
});

// Shuffle
shuffleBtn.addEventListener('click', () => {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle('active', isShuffled);
});

// Next/Prev buttons injected next to playPause
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

// Time display
audio.addEventListener('timeupdate', () => {
  const fmt = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration || 0)}`;
});

// Reset displayed duration when metadata loads
audio.addEventListener('loadedmetadata', () => {
  const fmt = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `0:00 / ${fmt(audio.duration || 0)}`;
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  const v = parseFloat(volumeSlider.value);
  audio.volume = Number.isFinite(v) ? v : 0.1;

  if (audio.volume === 0) {
    audio.muted = true;
    muteBtn.textContent = '🕨';
    muteBtn.classList.add('muted');
  } else {
    audio.muted = false;
    muteBtn.textContent = '🕪';
    muteBtn.classList.remove('muted');
  }
});

// Mute button
muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🕨' : '🕪';
  muteBtn.classList.toggle('muted', audio.muted);
  if (!audio.muted && parseFloat(volumeSlider.value) === 0) {
    audio.volume = 0.1;
    volumeSlider.value = '0.1';
  }
});

// ====== BOOT ======
window.addEventListener('DOMContentLoaded', () => {
  playTrack(0);
});
