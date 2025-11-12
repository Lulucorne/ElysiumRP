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
    title: 'About A Girl',
    artist: 'Nirvana',
    src: 'assets/characters/percival-yeon/music/About A Girl - Nirvana.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/About A Girl - Nirvana.jpeg',
  },
  {
    title: 'All I Need',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/All I Need - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/All I Need - Radiohead.jpeg',
  },
  {
    title: 'All I Wanted',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/All I Wanted - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/All I Wanted - Paramore.jpeg',
  },
  {
    title: 'Be Quiet and Drive (Far Away)',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Be Quiet and Drive _Far Away_. - Deftones.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Be Quiet and Drive _Far Away_. - Deftones.jpeg',
  },
  {
    title: 'Beverly Hills',
    artist: 'Weezer',
    src: 'assets/characters/percival-yeon/music/Beverly Hills - Weezer.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Beverly Hills - Weezer.jpeg',
  },
  {
    title: 'Beware',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Beware - Deftones.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Beware - Deftones.jpeg',
  },
  {
    title: 'Boys Don’t Cry - Single Version',
    artist: 'The Cure',
    src: 'assets/characters/percival-yeon/music/Boys Don_t Cry - Single Version - The Cure.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Boys Don_t Cry - Single Version - The Cure.jpeg',
  },
  {
    title: 'Buddy Holly',
    artist: 'Weezer',
    src: 'assets/characters/percival-yeon/music/Buddy Holly - Weezer.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Buddy Holly - Weezer.jpeg',
  },
  {
    title: 'Change (In the House of Flies)',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Change _In the House of Flies_. - Deftones.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Change _In the House of Flies_. - Deftones.jpeg',
  },
  {
    title: 'Cherry Waves',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Cherry Waves - Deftones.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Cherry Waves - Deftones.jpeg',
  },
  {
    title: 'Cigarette Daydreams',
    artist: 'Cage The Elephant',
    src: 'assets/characters/percival-yeon/music/Cigarette Daydreams - Cage The Elephant.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Cigarette Daydreams - Cage The Elephant.jpeg',
  },
  {
    title: 'Come a Little Closer',
    artist: 'Cage The Elephant',
    src: 'assets/characters/percival-yeon/music/Come a Little Closer - Cage The Elephant.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Come a Little Closer - Cage The Elephant.jpeg',
  },
  {
    title: 'Creep',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Creep - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Creep - Radiohead.jpeg',
  },
  {
    title: 'Crushcrushcrush',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/crushcrushcrush - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/crushcrushcrush - Paramore.jpeg',
  },
  {
    title: 'Dead Oaks',
    artist: 'Now, Now',
    src: 'assets/characters/percival-yeon/music/Dead Oaks - Now, Now.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Dead Oaks - Now, Now.jpeg',
  },
  {
    title: 'Decode',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Decode - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Decode - Paramore.jpeg',
  },
  {
    title: 'Digital Bath',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Digital Bath - Deftones.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Digital Bath - Deftones.jpeg',
  },
  {
    title: 'Emergency',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Emergency - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Emergency - Paramore.jpeg',
  },
  {
    title: 'Fake Plastic Trees',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Fake Plastic Trees - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Fake Plastic Trees - Radiohead.jpeg',
  },
  {
    title: 'Hard Times',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Hard Times - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Hard Times - Paramore.jpeg',
  },
  {
    title: 'Heavydirtysoul',
    artist: 'Twenty One Pilots',
    src: 'assets/characters/percival-yeon/music/Heavydirtysoul - Twenty One Pilots.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Heavydirtysoul - Twenty One Pilots.jpeg',
  },
  {
    title: 'Heroes - 2017 Remaster',
    artist: 'David Bowie',
    src: 'assets/characters/percival-yeon/music/Heroes - 2017 Remaster - David Bowie.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Heroes - 2017 Remaster - David Bowie.jpeg',
  },
  {
    title: 'High and Dry',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/High and Dry - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/High and Dry - Radiohead.jpeg',
  },
  {
    title: 'How to Disappear Completely',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/How To Disappear Completely - Radiohead.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/How To Disappear Completely - Radiohead.jpeg',
  },
  {
    title: 'I Caught Myself',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/I Caught Myself - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/I Caught Myself - Paramore.jpeg',
  },
  {
    title: 'I Just Threw Out the Love of My Dreams',
    artist: 'Weezer',
    src: 'assets/characters/percival-yeon/music/I Just Threw Out The Love Of My Dreams - Weezer.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/I Just Threw Out The Love Of My Dreams - Weezer.jpeg',
  },
  {
    title: 'I Wanna Be Yours',
    artist: 'Arctic Monkeys',
    src: 'assets/characters/percival-yeon/music/I Wanna Be Yours - Arctic Monkeys.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/I Wanna Be Yours - Arctic Monkeys.jpeg',
  },
  {
    title: 'Island in the Sun',
    artist: 'Weezer',
    src: 'assets/characters/percival-yeon/music/Island In The Sun - Weezer.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Island In The Sun - Weezer.jpeg',
  },
  {
    title: 'Jigsaw Falling Into Place',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Jigsaw Falling Into Place - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Jigsaw Falling Into Place - Radiohead.jpeg',
  },
  {
    title: 'Karma Police',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Karma Police - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Karma Police - Radiohead.jpeg',
  },
  {
    title: 'Let Down',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Let Down - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Let Down - Radiohead.jpeg',
  },
  {
    title: 'Looking Up',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Looking Up - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Looking Up - Paramore.jpeg',
  },
  {
    title: 'Luna - 2011 Remaster',
    artist: 'The Smashing Pumpkins',
    src: 'assets/characters/percival-yeon/music/Luna - 2011 Remaster - The Smashing Pumpkins.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Luna - 2011 Remaster - The Smashing Pumpkins.jpeg',
  },
  {
    title: 'Misery Business',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Misery Business - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Misery Business - Paramore.jpeg',
  },
  {
    title: 'Motion Picture Soundtrack',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/Motion Picture Soundtrack - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Motion Picture Soundtrack - Radiohead.jpeg',
  },
  {
    title: 'Mr. Brightside',
    artist: 'The Killers',
    src: 'assets/characters/percival-yeon/music/Mr. Brightside - The Killers.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Mr. Brightside - The Killers.jpeg',
  },
  {
    title: 'No Surprises',
    artist: 'Radiohead',
    src: 'assets/characters/percival-yeon/music/No Surprises - Radiohead.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/No Surprises - Radiohead.jpeg',
  },
  {
    title: 'Oblivious',
    artist: 'The Strokes',
    src: 'assets/characters/percival-yeon/music/Oblivious - The Strokes.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Oblivious - The Strokes.jpeg',
  },
  {
    title: 'Prehistoric',
    artist: 'Now, Now',
    src: 'assets/characters/percival-yeon/music/Prehistoric - Now, Now.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Prehistoric - Now, Now.jpeg',
  },
  {
    title: 'Rosemary',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Rosemary - Deftones.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Rosemary - Deftones.jpeg',
  },
  {
    title: 'Say It Ain’t So - Original Mix',
    artist: 'Weezer',
    src: 'assets/characters/percival-yeon/music/Say It Ain_t So - Original Mix - Weezer.mp3',
    cover:
      'assets/characters/percival-yeon/music/cover/Say It Ain_t So - Original Mix - Weezer.jpeg',
  },
  {
    title: 'School Friends',
    artist: 'Now, Now',
    src: 'assets/characters/percival-yeon/music/School Friends - Now, Now.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/School Friends - Now, Now.jpeg',
  },
  {
    title: 'Sextape',
    artist: 'Deftones',
    src: 'assets/characters/percival-yeon/music/Sextape - Deftones.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Sextape - Deftones.jpeg',
  },
  {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    src: 'assets/characters/percival-yeon/music/Smells Like Teen Spirit - Nirvana.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Smells Like Teen Spirit - Nirvana.jpeg',
  },
  {
    title: 'Spiderhead',
    artist: 'Cage The Elephant',
    src: 'assets/characters/percival-yeon/music/Spiderhead - Cage The Elephant.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Spiderhead - Cage The Elephant.jpeg',
  },
  {
    title: 'Still Into You',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/Still into You - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Still into You - Paramore.jpeg',
  },
  {
    title: 'Sweater Weather',
    artist: 'The Neighbourhood',
    src: 'assets/characters/percival-yeon/music/Sweater Weather - The Neighbourhood.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Sweater Weather - The Neighbourhood.jpeg',
  },
  {
    title: 'Tear in My Heart',
    artist: 'Twenty One Pilots',
    src: 'assets/characters/percival-yeon/music/Tear in My Heart - Twenty One Pilots.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Tear in My Heart - Twenty One Pilots.jpeg',
  },
  {
    title: 'That’s What You Get',
    artist: 'Paramore',
    src: 'assets/characters/percival-yeon/music/That_s What You Get - Paramore.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/That_s What You Get - Paramore.jpeg',
  },
  {
    title: 'The Spins',
    artist: 'Mac Miller',
    src: 'assets/characters/percival-yeon/music/The Spins - Mac Miller.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/The Spins - Mac Miller.jpeg',
  },
  {
    title: 'Thread',
    artist: 'Now, Now',
    src: 'assets/characters/percival-yeon/music/Thread - Now, Now.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Thread - Now, Now.jpeg',
  },
  {
    title: 'Wolf',
    artist: 'Now, Now',
    src: 'assets/characters/percival-yeon/music/Wolf - Now, Now.mp3',
    cover: 'assets/characters/percival-yeon/music/cover/Wolf - Now, Now.jpeg',
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
