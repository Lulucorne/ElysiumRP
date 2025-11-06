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

// Song list: easy to edit
const songs = [
  {
    title: 'Abandon Ship',
    artist: 'Gallows',
    src: 'assets/characters/callum-blanchette/music/AbandonShip-Gallows.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/AbandonShip-Gallows.jpg',
  },
  {
    title: 'By the Throat',
    artist: 'Pretty Girls Make Graves',
    src: 'assets/characters/callum-blanchette/music/BytheThroat-PrettyGirlsMakeGraves.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/BytheThroat-PrettyGirlsMakeGraves.jpg',
  },
  {
    title: 'Rotting Out',
    artist: 'Descendents',
    src: 'assets/characters/callum-blanchette/music/Descendents-RottingOut.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/Descendents-RottingOut.jpg',
  },
  {
    title: 'Engine No. 9',
    artist: 'Deftones',
    src: 'assets/characters/callum-blanchette/music/EngineNo9-Deftones.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/EngineNo9-Deftones.jpg',
  },
  {
    title: 'Hybrid Moments',
    artist: 'The Misfits',
    src: 'assets/characters/callum-blanchette/music/HybridMoments-TheMisfits.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/HybridMoments-TheMisfits.jpg',
  },
  {
    title: 'Nervous Breakdown',
    artist: 'Black Flag',
    src: 'assets/characters/callum-blanchette/music/NervousBreakdown-BlackFlag.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/NervousBreakdown-BlackFlag.jpg',
  },
  {
    title: 'Orange Julius',
    artist: 'Joyce Manor',
    src: 'assets/characters/callum-blanchette/music/OrangeJulius-JoyceManor.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/OrangeJulius-JoyceManor.jpg',
  },
  {
    title: 'Racecar Bed',
    artist: 'Jank',
    src: 'assets/characters/callum-blanchette/music/RacecarBed-Jank.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/RacecarBed-Jank.jpg',
  },
  {
    title: 'Saliva',
    artist: 'MF DOOM',
    src: 'assets/characters/callum-blanchette/music/Saliva-MFDOOM.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/Saliva-MFDOOM.jpg',
  },
  {
    title: 'Sunny Day Real Estate',
    artist: 'Circles',
    src: 'assets/characters/callum-blanchette/music/SunnyDayRealEstate-Circles.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/SunnyDayRealEstate-Circles.jpg',
  },
  {
    title: 'Time To Break Up',
    artist: 'blink-182',
    src: 'assets/characters/callum-blanchette/music/TimeToBreakUp-blink-182.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/TimeToBreakUp-blink-182.jpg',
  },
  {
    title: 'Title Fight - Leaf',
    artist: 'Side One Dummy',
    src: 'assets/characters/callum-blanchette/music/TitleFight-Leaf.mp3',
    cover: 'assets/characters/callum-blanchette/music/cover/TitleFight-Leaf.jpg',
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
  div.textContent = `♡  ${song.title}`;
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
  const srcPath = song.src.replace(/^assets\/characters\/callum-blanchette\//, '');
  const coverPath = song.cover.replace(/^assets\/characters\/callum-blanchette\//, '');
  audio.src = `${BASE}/${srcPath}`;
  coverArt.src = `${BASE}/${coverPath}`;
  trackInfo.textContent = `❤︎ ${song.title} – ${song.artist} ❤︎`;

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

// Like/Dislike buttons
document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const span = btn.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
    btn.disabled = true;
  });
});

document.querySelectorAll('.dislike-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const span = btn.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
    btn.disabled = true;
  });
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

const words = [
  'love',
  'hate',
  'chaos',
  'lost',
  'bleed',
  'dark',
  'scream',
  'curse',
  'shatter',
  'fuck',
];

function spawnWord() {
  const word = document.createElement('div');
  word.classList.add('floating-word');
  word.textContent = words[Math.floor(Math.random() * words.length)];

  // Divide screen into 3 horizontal zones: left, center, right
  const zonesX = [
    [0, window.innerWidth / 3],
    [window.innerWidth / 3, (2 * window.innerWidth) / 3],
    [(2 * window.innerWidth) / 3, window.innerWidth],
  ];

  // Divide screen into 3 vertical zones: top, middle, bottom
  const zonesY = [
    [0, window.innerHeight / 3],
    [window.innerHeight / 3, (2 * window.innerHeight) / 3],
    [(2 * window.innerHeight) / 3, window.innerHeight],
  ];

  // Pick a random zone for X and Y
  const zoneX = zonesX[Math.floor(Math.random() * zonesX.length)];
  const zoneY = zonesY[Math.floor(Math.random() * zonesY.length)];

  // Pick a random position inside the zone
  const startX = zoneX[0] + Math.random() * (zoneX[1] - zoneX[0]);
  const startY = zoneY[0] + Math.random() * (zoneY[1] - zoneY[0]);

  word.style.left = startX + 'px';
  word.style.top = startY + 'px';

  document.body.appendChild(word);

  // Trigger fade in + slow drift
  setTimeout(() => {
    const driftX = (Math.random() - 0.5) * 100; // horizontal drift ±50px
    const driftY = (Math.random() - 0.5) * 100; // vertical drift ±50px
    word.style.opacity = 0.5 + Math.random() * 0.4; // random semi-transparent
    word.style.transform = `translate(${driftX}px, ${driftY}px)`;
  }, 50);

  // Fade out and remove after 8 seconds
  setTimeout(() => {
    word.style.opacity = 0;
    setTimeout(() => word.remove(), 3000); // remove after fade-out
  }, 8000);
}

// Spawn a new word every 0.5 seconds
setInterval(spawnWord, 500);
