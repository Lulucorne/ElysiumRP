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

songs.sort((a, b) => a.title.localeCompare(b.title));

songs.forEach((song, index) => {
  const div = document.createElement('div');
  div.classList.add('track');
  if (index === 0) div.classList.add('active');
  div.dataset.index = index;
  div.textContent = `✧  ${song.title}`;
  playlistContainer.appendChild(div);
  div.addEventListener('click', () => playTrack(index));
});

audio.volume = 0.1;
volumeSlider.value = audio.volume;

function playTrack(index) {
  currentIndex = index;
  const song = songs[index];
  const srcPath = song.src.replace(/^assets\/characters\/callum-blanchette\//, '');
  const coverPath = song.cover.replace(/^assets\/characters\/callum-blanchette\//, '');
  audio.src = `${BASE}/${srcPath}`;
  coverArt.src = `${BASE}/${coverPath}`;
  trackInfo.textContent = `✦ ${song.title} – ${song.artist} ✦`;

  document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
  document.querySelector(`.track[data-index="${index}"]`).classList.add('active');

  audio.play().catch(() => console.log('Autoplay blocked.'));
  updatePlayPauseBtn();
}

function updatePlayPauseBtn() {
  playPauseBtn.textContent = audio.paused ? '▶' : '⏸';
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
  updatePlayPauseBtn();
});

shuffleBtn.addEventListener('click', () => {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle('active', isShuffled);
});

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

audio.addEventListener('ended', nextTrack);

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

audio.addEventListener('timeupdate', () => {
  const formatTime = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
  timeStamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
});

window.addEventListener('DOMContentLoaded', () => {
  playTrack(0);
});

const overlay = document.getElementById('start-overlay');
overlay.addEventListener('click', () => {
  playTrack(0);
  overlay.style.display = 'none';
});

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

const icons = [
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon1.png',
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon2.png',
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon3.png',
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon4.png',
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon5.png',
  'https://lulucorne.github.io/ElysiumRP/assets/characters/callum-blanchette/background/Icon7.png',
];

let lastUsedIcons = [];
let spawnStep = 0;

function spawnIcon() {
  let available = icons.filter((i) => !lastUsedIcons.includes(i));
  if (available.length === 0) {
    lastUsedIcons = [];
    available = [...icons];
  }
  const chosen = available[Math.floor(Math.random() * available.length)];
  lastUsedIcons.push(chosen);

  const icon = document.createElement('img');
  icon.classList.add('floating-icon');
  icon.src = chosen;

  const leftZone = [0, window.innerWidth * 0.15];
  const rightZone = [window.innerWidth * 0.85, window.innerWidth];
  const topZone = [window.innerHeight * 0.1, window.innerHeight * 0.45];
  const bottomZone = [window.innerHeight * 0.55, window.innerHeight * 0.9];

  let startX, startY;
  const minDistance = 300;
  let tries = 0;

  if (spawnStep === 0) {
    startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
    startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
  } else if (spawnStep === 1) {
    startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
    startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
  } else if (spawnStep === 2) {
    startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
    startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
  } else if (spawnStep === 3) {
    startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
    startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
  }

  while (isOverlapping(startX, startY, minDistance) && tries < 20) {
    if (spawnStep === 0) {
      startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
      startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
    } else if (spawnStep === 1) {
      startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
      startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
    } else if (spawnStep === 2) {
      startX = rightZone[0] + Math.random() * (rightZone[1] - rightZone[0]);
      startY = topZone[0] + Math.random() * (topZone[1] - topZone[0]);
    } else if (spawnStep === 3) {
      startX = leftZone[0] + Math.random() * (leftZone[1] - leftZone[0]);
      startY = bottomZone[0] + Math.random() * (bottomZone[1] - bottomZone[0]);
    }
    tries++;
  }

  icon.style.left = `${startX}px`;
  icon.style.top = `${startY}px`;

  spawnStep = (spawnStep + 1) % 4;

  const size = 250 + (Math.random() - 0.5) * 100;
  icon.style.width = `${size}px`;
  icon.style.height = `${size}px`;

  const amp = 16 + Math.random() * 28;
  const bobDur = (1.4 + Math.random() * 0.8).toFixed(2);
  const delay = (Math.random() * 1.5).toFixed(2);
  const steps = Math.floor(6 + Math.random() * 4);

  icon.style.setProperty('--amp', `${amp}px`);
  icon.style.setProperty('--bobDur', `${bobDur}s`);
  icon.style.setProperty('--delay', `${delay}s`);
  icon.style.setProperty('--steps', steps);

  document.body.appendChild(icon);

  setTimeout(() => icon.remove(), 10000);
}

function isOverlapping(x, y, minDist) {
  const iconsOnPage = document.querySelectorAll('.floating-icon');
  for (let el of iconsOnPage) {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;
    const dist = Math.hypot(elX - x, elY - y);
    if (dist < minDist) return true;
  }
  return false;
}

setInterval(spawnIcon, 1200);
