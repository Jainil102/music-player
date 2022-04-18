const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song titles. They should match with their song mp3 audio name! 
const songs = ['The Weeknd - Blinding Lights', 'The Weeknd - Call Out My Name', 'The Weeknd - Die For You', 'The Weeknd - Earned It', 'The Weeknd - Heartless', 'The Weeknd - I Feel It Coming (Feat. Daft Punk)', 'The Weeknd - Starboy (feat. Daft Punk)', 'The Weeknd - The Hills'];

// to keep track of songs
let songIndex = 0;

// Initially load songs into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    // audio.src = `https://webdatacloud.blob.core.windows.net/clouddatamusic/The Weeknd - Blinding Lights.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong(){
    if(songIndex == 0){
        songIndex = songs.length - 1;
    }
    else {
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    if(songIndex == songs.length - 1){
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playSong(); 
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX/width)*duration;
}


// Event Listeners
// play
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

// prev && next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// progress bar
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// audio change after song ends
audio.addEventListener('ended', nextSong);