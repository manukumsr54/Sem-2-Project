let songs = [
    {
    title: "Believer",
    artist: "Imagine Dragons",
    file: "songs/believer.mpeg",
    duration: "3:22"
  },

  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    file: "songs/blinding_lights.mpeg",
    duration: "3:23"
  },

  {
    title: "Cheap Thrills",
    artist: "Sia",
    file: "songs/cheap_thrills.mpeg",
    duration: "3:32"
  },

  {
    title: "House of Memories",
    artist: "Panic! At The Disco",
    file: "songs/house_of_memories.mpeg",
    duration: "3:29"
  },
  
  {
    title: "Judas",
    artist: "Lady Gaga",
    file: "songs/judas.mpeg",
    duration: "4:07"
  },

  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    file: "songs/shape_of_you.mpeg",
    duration: "3:53"
  },
  
  {
    title: "Tell Aunt Rhody",
    artist: "Resident Evil 7",
    file: "songs/tell_aunt_rhody.mpeg",
    duration: "2:55"
  },

  {
    title: "To Ashes and Blood",
    artist: "Arcane",
    file: "songs/to_ashes_and_blood.mpeg",
    duration: "4:05"
  },

];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const songList = document.getElementById("songList");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

function loadSongs() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    let div = document.createElement("div");
    div.className = "song";

    div.innerHTML = `
      <span>${index + 1}</span>
      <div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
      <span>${song.artist}</span>
      <span>${song.duration}</span>
    `;

    div.onclick = () => selectSong(index);
    songList.appendChild(div);
  });
}

function selectSong(index) {
  currentSong = index;
  audio.src = songs[currentSong].file;

  songTitle.innerText = songs[currentSong].title;
  artist.innerText = songs[currentSong].artist;

  audio.play();
  isPlaying = true;
  playBtn.innerText = "⏸";
}

function playPause() {
  if (!audio.src) {
    selectSong(0);
    return;
  }

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }

  isPlaying = !isPlaying;
}

function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  selectSong(currentSong);
}

function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  selectSong(currentSong);
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value * audio.duration) / 100;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

loadSongs();