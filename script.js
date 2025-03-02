const musicContainer = document.getElementsByClassName("music-player-cont")[0];
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const title = document.getElementById("songTitle");
const artist = document.getElementById("songArtist");
const cover = document.getElementById("cover");
//const durTime = document.getElementById("durTime");

const BoulevarBrokenDreams = new Song("Boulevard of Broken Dreams", "Green Day", "BoulevardOfBrokenDreams" ,"Boulevard_of_Broken_Dreams.jpg");
const BlackHoleSun = new Song("Black Hole Sun", "SoundGarden", "BlackHoleSun", "Black_Hole_Sun.jpg");
const HowYouRemindMe = new Song("How You Remind Me", "Nickelback", "HowYouRemindMe", "How_You_Remind_Me.jpg");
const SmellsLikeTeenSpirit = new Song("Smells Like Teen Spirit", "Nirvana", "SmellsLikeTeenSpirit", "Smells_Like_Teen_Spirit.jpg");
const OnMyOwn = new Song("On my Own", "Ashes Remain", "OnMyOwn", "On_My_Own.jpg");

const songs = [
    BoulevarBrokenDreams, 
    BlackHoleSun,
    HowYouRemindMe,
    SmellsLikeTeenSpirit,
    OnMyOwn
];

// Index in Array of Current Song
let songIndex = 0;

//Load Initial Song in DOM
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    audio.src = `./music/${song.audioFile}.mp3`;
    cover.src = `./imgs/${song.coverImage}`;
};

// Event Listener Play Button
playButton.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    isPlaying ? pauseSong() : playSong();
});

function playSong() {
    musicContainer.classList.add("play");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove("play");
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    playButton.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
};

function prevSong() {
   songIndex - 1 < 0 ? songIndex = songs.length - 1 : songIndex--;
   loadSong(songs[songIndex]);
   playSong();  
}

function nextSong() {
   songIndex + 1 === songs.length ? songIndex = 0 : songIndex++;
   loadSong(songs[songIndex]);
   playSong();  
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${String(progressPercentage)}%`;
}

function setProgress(e, width) {
    const clickPosition = e.offsetX;
    console.log(clickPosition);
    const duration = audio.duration;
    console.log(audio.duration);
    audio.currentTime = (clickPosition / width) * duration;
}

function getMinutes(currentTime) {
    let minutes = !currentTime ? 0 : Math.floor(currentTime / 60);
    return minutes < 10 ? "0" + String(minutes) : String(minutes);    
}

function getSeconds(currentTime) {
    if (Math.floor(currentTime < 60)) {
        let secPrev = Math.floor(currentTime);
        return secPrev < 10 ? "0" + String(secPrev) : String(secPrev);
    }
    for (let i = 1; i <= 60; i++) {
        if(Math.floor(currentTime) >= (60 * i) && Math.floor(currentTime) < (60 * ( i + 1))) {
            let secPrev = Math.floor(currentTime) - ( 60 * i);
            return secPrev < 10 ? "0" + String(secPrev) : String(secPrev);
        }
    }
}

function durTime(e, width) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;
    // Get Minutes
    let minutes = getMinutes(currentTime);
    // Get Seconds
    let seconds = getSeconds(currentTime);
}

//Change Song to Previous
prevButton.addEventListener("click", () => {
    prevSong();
});

//Change Song to Previous
nextButton.addEventListener("click", () => {
    nextSong();
});

audio.addEventListener("timeupdate", function(e) {
    updateProgress(e);
    durTime(e, this.clientWidth);
});

progressContainer.addEventListener("click", function(e) {
    setProgress(e, this.clientWidth);
});

audio.addEventListener("ended", () => {
    nextSong();
})