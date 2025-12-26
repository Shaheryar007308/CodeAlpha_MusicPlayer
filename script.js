const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let songIndex = 0;

const songs = [
  { title: "Shape of You", artist: "Ed Shareen", src: "songs/shape.mp3" },
  { title: "Die With a Smile", artist: "Burno mars & Lady gaga", src: "songs/die.mp3" },
  { title: "Despacito", artist: "Luis Fonsi", src: "songs/despacito.mp3" }
];

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playPause() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(value) {
  audio.volume = value;
}

function formatTime(time) {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

audio.addEventListener("ended", nextSong);

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.onclick = () => {
    songIndex = index;
    loadSong(songIndex);
    audio.play();
  };
  playlistEl.appendChild(li);
});

// Load first song
loadSong(songIndex);
