<template>
  <div id="ytb-container">
    <div class="ytb" v-show="displayYoutube" id="player"></div>
    <div class="params">
      <button @click="prevPlaylist">⏮</button>
      <button @click="pausePlayPlaylist">⏯</button>
      <button @click="nextPlaylist" @keydown.shift="easterEgg" id="next">⏭</button>
      <button @click="setMuteState" v-if="!muted">🔇</button>
      <button @click="setMuteState" v-else>🔊</button>
    </div>
  </div>
</template>

<script>
function setupYtbApi() {
  const tag = document.createElement("script");
  tag.id = "iframe-demo";
  tag.src = "https://www.youtube.com/iframe_api";
  const [firstScriptTag] = document.getElementsByTagName("script");
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player;

export default {
  name: "YtbPlayer",
  data() {
    return {
      displayYoutube: true,
      livesId: [],
      easterEggs: [],
      easterEggsSongsId: -1,
      songId: this.$store.getters.globalState.currentSongIndex,
      muted: true
    }
  },
  methods: {
    readFileAndStore() {
      let lofi = require("../data/lofi.json");
      this.livesId = lofi.id;
      this.easterEggs = lofi.easterEggs;
    },
    nextPlaylist() {
      this.songId++ === this.livesId.length - 1 ? this.songId = 0 : this.songId;
      localStorage.setItem("currentSongIndex", this.songId);
      let id = this.livesId[this.songId];
      this.loadVideoFromApi(id)
    },
    prevPlaylist() {
      --this.songId === -1 ? this.songId = this.livesId.length - 1 : this.songId;
      localStorage.setItem("currentSongIndex", this.songId);
      let id = this.livesId[this.songId];
      this.loadVideoFromApi(id)
    },
    pausePlayPlaylist() {
      if (player.getPlayerState() === 1) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    },
    easterEgg() {
      this.easterEggsSongsId++ === this.easterEggs.length - 1 ? this.easterEggsSongsId = 0 : this.easterEggsSongsId;
      let id = this.easterEggs[this.easterEggsSongsId];
      this.loadVideoFromApi(id)
    },
    setMuteState() {
      if (this.muted) {
        player.unMute();
        player.setVolume(15);
      } else {
        player.mute();
      }

      this.muted = !this.muted;
    },
    loadVideoFromApi(id) {
      this.saveLocalStorage(id);
      player.loadVideoById(id);
    },
    saveLocalStorage(id) {
      localStorage.setItem("lastSong", id);
    },
    loadApi() {
      window.onYouTubeIframeAPIReady = () => {
        // eslint-disable-next-line no-unused-vars
        player = new window.YT.Player("player", {
          videoId: this.$store.getters.globalState.lastSong,
          playerVars: {
            'autoplay': 1,
            'mute': 1,
            'rel': 0,
            'showInfo': 0
          },
          events: {
            onStateChange: window.onPlayerStateChange
          }
        });
        let player_id = document.getElementById("player")
        player_id.style.width = "100%";
      };

      window.onPlayerStateChange = (event) => {
        if (event.data === 0) {
          this.nextPlaylist()
        }
      };

    }
  },
  created() {
    this.readFileAndStore();
    setupYtbApi();
    this.loadApi();
  }
}
</script>

<style scoped>

.ytb {
  width: 100%;
}

.params {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.params > * {
  width: 80px;
  font-size: 24px;
}

</style>