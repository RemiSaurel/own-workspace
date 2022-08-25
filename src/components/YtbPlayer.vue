<template>
  <div id="ytb-container">
    <div class="ytb" v-show="displayYoutube">
      <iframe width="100%" height="360" src="https://www.youtube-nocookie.com/embed/XDh0JcxrbPM?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              id="youtube_video">
      </iframe>
    </div>
    <div class="params">
      <button @click="prevPlaylist" >⏮</button>
      <button @click="nextPlaylist" @mousedown.middle="easterEgg" id="next">⏭</button>
    </div>
  </div>
</template>

<script>

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
      let ytb = document.getElementById("youtube_video")
      ytb.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
    }
  },
  created() {
    this.readFileAndStore();
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