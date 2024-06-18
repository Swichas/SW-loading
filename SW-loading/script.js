

function updateServerDetails() {
    document.getElementById("server-name").innerText = serverDetails.name;
}

function simulateLoading() {
    let loadProgress = 0;
    const loadingBarFill = document.getElementById("loading-bar-fill");

    const loadingInterval = setInterval(() => {
        loadProgress += 10;
        loadingBarFill.style.width = loadProgress + "%";

        if (loadProgress >= 100) {
            clearInterval(loadingInterval);
        }
    }, 1000);
}

const musicPlayer = {
    audioElement: document.getElementById("background-music"),
    playlist: ["lonely-heart.mp3"], 
    currentTrack: 0,
    isMuted: false,

    play: function() {
        this.audioElement.src = this.playlist[this.currentTrack];
        this.audioElement.play();
        document.getElementById("music-name").innerText = this.getTrackName(this.playlist[this.currentTrack]);
    },

    stop: function() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        document.getElementById("music-name").innerText = "Music is not playing";
    },

    next: function() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.play();
    },

    mute: function() {
        this.isMuted = !this.isMuted;
        this.audioElement.muted = this.isMuted;
        document.getElementById("mute-button").innerText = this.isMuted ? "Unmute" : "Mute";
    },

    setVolume: function(volume) {
        this.audioElement.volume = volume;
    },

    getTrackName: function(filePath) {
        return filePath.substring(filePath.lastIndexOf('/') + 1);
    }
};

document.getElementById("play-button").addEventListener("click", () => musicPlayer.play());
document.getElementById("stop-button").addEventListener("click", () => musicPlayer.stop());
document.getElementById("next-button").addEventListener("click", () => musicPlayer.next());
document.getElementById("mute-button").addEventListener("click", () => musicPlayer.mute());
document.getElementById("volume-slider").addEventListener("input", (event) => {
    musicPlayer.setVolume(event.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
    updateServerDetails();
    simulateLoading();
    musicPlayer.play(); // Attempt to play music on page load
});
