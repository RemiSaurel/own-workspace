<template>
  <div id="container">
    <div class="pomodoro">
      <div id="dot-container">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div id="message">
        <div v-if="this.isRestingTime">
          Pause time 🎉
        </div>
        <div v-else>
          Work time 📚
        </div>
      </div>
      <div id="time">
        <div id="minutes">
          <div><i @click="this.addMinutes" class="arrow up"></i></div>
          <span>{{ minutes }}</span>
          <div><i @click="this.substractMinutes" class="arrow down"></i></div>
        </div>
        <span id="colon">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div id="params">
        <div id="startStop">
          <button @click="startSession" id="start">▶️</button>
          <button @click="pauseSession" id="pause" disabled>⏸</button>
          <button @click="resetSession" id="reset">🔄</button>
        </div>
      </div>
    </div>
    <stats></stats>
  </div>
</template>

<script>
import Stats from "@/components/Infos";

const MINUTES = 25;
const RANGE_MINUTES = 5;
const SECONDS = 0;
const SHORT_PAUSE = 5;
const LONG_PAUSE = 30;

export default {
  name: "Pomodoro",
  components: {Stats},
  data() {
    return {
      minutes: MINUTES,
      seconds: SECONDS,
      sessionStarted: false,
      nbSessionsFinished: 0,
      isRestingTime: false,
      customTimer: MINUTES,
    }
  },
  methods: {
    lockArrows() {
      const arrows = document.querySelectorAll(".arrow");
      arrows.forEach(arrow => {
        arrow.style.pointerEvents = "none";
      });
    },
    unlockArrows() {
      const arrows = document.querySelectorAll(".arrow");
      arrows.forEach(arrow => {
        arrow.style.pointerEvents = "auto";
      });
    },
    addMinutes() {
      this.minutes += RANGE_MINUTES;
      this.handleLimits()
      this.customTimer = this.minutes;
    },
    substractMinutes() {
      this.minutes -= RANGE_MINUTES;
      this.handleLimits()
      this.customTimer = this.minutes;
    },
    handleLimits() {
      if (this.minutes < 10) {
        this.minutes = 10;
      } else if (this.minutes > 60) {
        this.minutes = 60;
      }
    },
    startSession() {
      if (!this.sessionStarted) {
        this.lockArrows()
        this.countDownTimer();
        this.sessionStarted = true;
      }
      if (!this.isRestingTime) {
        this.enableButton("pause");
        this.enableButton("reset");
      }
      this.disableButton("start");
      let all = document.querySelectorAll("#presetTime button");
      for (let el of all) {
        el.disabled = true;
      }
    },
    pauseSession() {
      this.sessionStarted = false;
      this.disableButton("pause");
      this.enableButton("start");
      clearTimeout(this.timeout);
    },
    disableButton(buttonId) {
      let button = document.getElementById(buttonId);
      button.disabled = true;
    },
    enableButton(buttonId) {
      let button = document.getElementById(buttonId);
      button.disabled = false;
    },
    resetSession() {
      this.sessionStarted = false;
      this.minutes = this.customTimer;
      this.seconds = SECONDS;
      this.prettyTime();
      clearTimeout(this.timeout);
      let all = document.querySelectorAll("#presetTime button, #start");
      for (let el of all) {
        el.disabled = false;
      }
      this.disableButton("pause")
      this.unlockArrows()
    },
    countDownTimer: function () {
      if (this.minutes === "00" && this.seconds === "00") {
        if (this.isRestingTime) {
          this.isRestingTime = false;
          this.resetSession();
          alert("PAUSE TERMINÉE 📚");
        } else {
          alert("SESSION TERMINÉE 👏");
          this.nbSessionsFinished++;
          this.$store.commit("updateNbSessionsFinished");
          localStorage.setItem("nbSessions", this.$store.getters.nbSessions);
          if (this.nbSessionsFinished === 4) {
            this.setupPauseTimer(LONG_PAUSE);
            this.nbSessionsFinished = 0;
          } else {
            this.setupPauseTimer(SHORT_PAUSE);
          }
          this.changeDots();
        }
      } else {
        const interval = 1000; // ms
        let expected = Date.now() + interval;
        let stepFunc = () => {
          let dt = Date.now() - expected;
          if (dt > interval) {
            // handle error?
          }
          this.minutes = parseInt(this.minutes);
          this.seconds = parseInt(this.seconds);
          if (this.seconds === 0) {
            if (this.minutes > 0) {
              this.minutes -= 1;
              this.seconds = 59;
            }
          } else {
            this.seconds -= 1;
          }
          expected += interval;
          this.timeout = setTimeout(stepFunc, Math.max(0, interval - dt));
          this.prettyTime();
          if (this.minutes === "00" && this.seconds === "00") {
            this.countDownTimer()
          }
        }
        this.timeout = setTimeout(stepFunc, interval);
      }
    },
    changeDots() {
      let dots = document.querySelectorAll(".dot");
      for (let dot of dots) {
        dot.classList.remove("active");
      }
      for (let i = 0; i < this.nbSessionsFinished; i++) {
        dots[i].classList.add("active");
      }
    },
    setupPauseTimer(minutes) {
      this.isRestingTime = true;
      this.sessionStarted = false;
      this.enableButton("start");
      this.disableButton("reset")
      this.disableButton("pause")
      this.minutes = minutes.toString();
      this.seconds = 0;
      this.prettyTime();
    },
    prettyTime() {
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
      if (this.isRestingTime) {
        document.title = "🏖 " + this.minutes + ":" + this.seconds;
      } else {
        document.title = "🍅 " + this.minutes + ":" + this.seconds;
      }
    }
  },
  created() {
    this.prettyTime();
  },
}
</script>

<style scoped>
.pomodoro {
  text-align: center;
  color: white;
  background: #504746;
  border-radius: 16px;
  padding-top: 8px;
  padding-bottom: 16px;
  margin-right: 16px;
  min-height: 260px;
  box-shadow: rgba(0, 0, 0) 0px 4px 10px;
}

#container {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
}

#time {
  display: flex;
  justify-content: center;
  font-weight: 800;
  font-size: 5vw;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
}

#startStop > button {
  font-size: 32px;
  text-align: center;
}

#params {
  text-align: center;
}

#params #presetTime > button {
  margin: 8px;
  font-size: 24px;
  width: 62px;
  text-align: center;
}

#seconds {
  display: inline-block;
  width: 10vw;
  padding-top: 18px;
}

#colon {
  padding-top: 15px;
}

#minutes {
  display: flex;
  flex-direction: column;
}

#minutes > div {
  display: flex;
  justify-content: center;
}

#minutes > span {
  display: inline-block;
  width: 10vw;
}

.arrow {
  border: solid white;
  border-width: 0 6px 6px 0;
  font-size: 1rem;
  display: inline-block;
  padding: 6px;
}

.arrow:hover {
  border: solid mediumseagreen;
  border-width: 0 6px 6px 0;
  cursor: pointer;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

#message {
  font-size: 1.6rem;
}

.dot {
  height: 25px;
  width: 25px;
  background-color: lightslategrey;
  border-radius: 50%;
  margin: 12px 4px 12px 4px;
  display: inline-block;
}

.active {
  height: 25px;
  width: 25px;
  background-color: mediumseagreen;
  border-radius: 50%;
  margin: 12px 4px 12px 4px;
  display: inline-block;
}

/* ********** */
/* RESPONSIVE */
/* ********** */

@media (max-width: 835px) {
  #container {
    margin-top: 16px;
  }

  #message {
    font-size: 1.6rem;
  }

  .pomodoro {
    margin-right: 8px;
    width: 50%;
  }
}

@media (max-width: 675px) {
  #time {
    font-size: 38px;
  }

  #colon {
    margin-right: 8px;
    margin-left: 8px;
  }
}

@media (max-width: 550px) {
  .pomodoro {
    width: 100%;
    margin-right: 0;
  }
}


</style>