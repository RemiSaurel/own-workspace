<template>
  <div id="ytb-container">
    <div class="ytb" v-show="displayYoutube" id="player"></div>
    <div class="params">
      <button @click="prevPlaylist" >⏮</button>
      <button @click="nextPlaylist" @keydown.shift="easterEgg" id="next">⏭</button>
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
      easterEggsSongsId:-1,
      songId: 0
    }
  },
  methods: {
    readFileAndStore()
    {
      let lofi = require("../data/lofi.json");
      this.livesId = lofi.id;
      this.easterEggs = lofi.easterEggs;
    },
    nextPlaylist()
    {
      this.songId++ === this.livesId.length - 1 ? this.songId = 0 : this.songId;
      let id = this.livesId[this.songId];
      this.changeYtbSrc(id)
    },
    prevPlaylist()
    {
      --this.songId === -1 ? this.songId = this.livesId.length - 1: this.songId;
      let id = this.livesId[this.songId];
      this.changeYtbSrc(id)
    },
    easterEgg() {
      this.easterEggsSongsId++ === this.easterEggs.length - 1 ? this.easterEggsSongsId = 0 : this.easterEggsSongsId;
      let id = this.easterEggs[this.easterEggsSongsId];
      this.changeYtbSrc(id)
    },
    changeYtbSrc(id) {
      player.loadVideoById(id);
    },
    loadApi() {
      window.onYouTubeIframeAPIReady = () => {
        // eslint-disable-next-line no-unused-vars
        player = new window.YT.Player("player", {
          videoId: "XDh0JcxrbPM",
          playerVars: {
            'autoplay': 1,
            'mute': 1
          },
          events: {
            onStateChange: window.onPlayerStateChange
          }
        });
        document.getElementById("player").style.width = "100%";
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