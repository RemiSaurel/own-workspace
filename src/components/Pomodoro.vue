<template>
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
      <span id="minutes">{{minutes}}</span>
      <span id="colon">:</span>
      <span id="seconds">{{seconds}}</span>
    </div>
    <div id="params">
      <div id="presetTime">
        <button @click="setMinutes(25)">25'</button>
        <button @click="setMinutes(45)">45'</button>
      </div>
      <div id="startStop">
        <button @click="startSession" id="start">▶️</button>
        <button @click="pauseSession" id="pause" disabled>⏸</button>
        <button @click="resetSession" id="reset">🔄</button>
      </div>
    </div>
  </div>
</template>

<script>
const MINUTES = 25;
const SECONDS = 0;
const SHORT_PAUSE = 5;
const LONG_PAUSE = 30;

export default {
  name: "Pomodoro",
  data () {
    return {
      minutes: MINUTES,
      seconds: SECONDS,
      sessionStarted: false,
      nbSessionsFinished: 0,
      isRestingTime: false,
      customTimer: MINUTES
    }
  },
  methods: {
    setMinutes(value) {
      this.minutes = value.toString();
      this.customTimer = value;
    },
    startSession() {
      if (!this.sessionStarted) {
        this.countDownTimer();
        this.sessionStarted = true;
      }
      if (!this.isRestingTime) {
        this.enableButton("pause");
        this.enableButton("reset");
      }
      this.disableButton("start");
      let all = document.querySelectorAll("#presetTime button");
      for (let el of all) { el.disabled = true; }
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
      for (let el of all) { el.disabled = false; }
      this.disableButton("pause")
    },
    countDownTimer: function () {
      if (this.minutes === "00" && this.seconds === "00") {
        if (this.isRestingTime) {
          this.isRestingTime = false;
          this.resetSession();
        } else {
          this.nbSessionsFinished++;
          if (this.nbSessionsFinished === 4) {
            this.setupPauseTimer(LONG_PAUSE);
            this.nbSessionsFinished = 0;
          } else {
            this.setupPauseTimer(SHORT_PAUSE);
          }
          this.changeDots();
        }
      } else {
        this.timeout = setTimeout(() => {
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
          this.prettyTime()
          this.countDownTimer()
        }, 1000)
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
    setupPauseTimer(minutes){
      this.isRestingTime = true;
      this.sessionStarted = false;
      this.enableButton("start");
      this.disableButton("reset")
      this.disableButton("pause")
      this.minutes = minutes.toString();
      this.seconds = 0;
      this.prettyTime();
    },
    prettyTime () {
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    }
  },
  created() {
    this.prettyTime();
  }
}
</script>

<style scoped>
.pomodoro {
  text-align: center;
}

#time {
  font-weight: 800;
  font-size: 8vw;
  text-align: center;
}

#startStop > button{
  font-size: 32px;
  width: 120px;
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
}
#minutes {
  display: inline-block;
  width: 10vw;
}

@media (max-width: 490px) {
  #message {
    display: none;
  }
}

@media (min-width: 490px) {
  #message {
    font-size: 1.6rem;
  }
}

@media (max-width: 390px) {
  .dot {
    display: none;
  }

  .active {
    display: none;
  }
}

@media (min-width: 390px) {
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
}

</style>