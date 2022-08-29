<template>
<div id="settings-container">
  <div id="color-palette" class="bubble-container">
    <div v-for="color in colors" :key="color.id">
      <div class="bubble-item" :id="color" :style="{backgroundColor: color, borderColor: activeColor}" @click="setBackgroundColor($event, color)"></div>
    </div>
  </div>
</div>
</template>

<script>
const DEFAULT_COLOR = "#fdde95";
export default {
  name: "Settings",
  data() {
    return {
      colors: {
        default: DEFAULT_COLOR,
        greenBlue: "#9acabf",
        green: "#ABCEA7",
        grey: "#d4d4e8",
        salmon: "#E6CEBD"
      },
      activeColor: "#504746",
    }
  },
  methods: {
    setBackgroundColor(event,color) {
      this.removeActiveColorFromPalette()
      event.target.style.borderColor = this.activeColor;
      document.body.style.backgroundColor = color;
      this.$store.commit("setColorSelected", color);
      localStorage.setItem("themeColor", this.$store.getters.colorSelected)
    },
    removeActiveColorFromPalette() {
      const palette = document.querySelectorAll(".bubble-item");
      for (let i = 0; i < palette.length; i++) {
        palette[i].style.borderColor = "lightslategrey";
      }
    },
    setFirstColor() {
      const color = this.$store.getters.globalState.themeColor;
      document.getElementById(color).style.borderColor = this.activeColor;
      document.body.style.backgroundColor = color;
    }
  },
  mounted() {
    this.removeActiveColorFromPalette()
    this.setFirstColor()
  }
}
</script>

<style scoped>

.bubble-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.bubble-item {
  margin-top: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: solid 2px lightslategrey;
}

/* ********** */
/* RESPONSIVE */
/* ********** */

@media (max-width: 835px) {
  #color-palette {
    flex-direction: row;
    justify-content: center;
    margin-top: 8px;
  }
  .bubble-item {
    margin-top: 0;
    margin-right: 4px;
  }
}

</style>