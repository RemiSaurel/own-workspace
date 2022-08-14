<template>
  <div id="ytb-container">
    <div class="ytb" v-show="displayYoutube">
      <iframe width="100%" height="360" src="https://www.youtube-nocookie.com/embed/MCkTebktHVc?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              id="youtube_video">
      </iframe>
    </div>
    <div class="params">
      <button @click="prevPlaylist" id="prev">⏮</button>
      <button @click="nextPlaylist" id="next">⏭</button>
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
      songId: 0
    }
  },
  methods: {
    readFileAndStore()
    {
      let lofi = require("../data/lofi.json");
      this.livesId = lofi.id;
    },
    nextPlaylist()
    {
      this.songId++ === this.livesId.length - 1 ? this.songId = 0 : this.songId;
      let id = this.livesId[this.songId];
      let ytb = document.getElementById("youtube_video")
      ytb.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
    },
    prevPlaylist()
    {
      --this.songId === -1 ? this.songId = this.livesId.length - 1: this.songId;
      console.log(this.songId)
      console.log(this.livesId.length)
      let id = this.livesId[this.songId];
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
  margin-top: 24px;
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