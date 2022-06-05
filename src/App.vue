<template>
  <div id="app">
    <header>
      <Welcome/>
      <h3 id="time"></h3>
    </header>
    <to-do-list></to-do-list>
    <div id="switch_youtube">
      <label class="switch">
        <input type="checkbox" v-model="displayYoutube">
        <span class="slider round"></span>
      </label>
    </div>
    <div class="ytb" v-show="displayYoutube">
      <iframe width="80%" height="400" src="https://www.youtube-nocookie.com/embed/MCkTebktHVc?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      id="youtube_video">
      </iframe>
    </div>
    <footer>Made with 💙 by <a href="https://github.com/RemiSaurel" target="_blank" class="name">Rémi Saurel</a> </footer>
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import ToDoList from "@/components/ToDoList";
export default {
  name: 'App',
  components: {
    Welcome,
    ToDoList
  },
  data() {
    return {
      displayYoutube: true
    }
  }
}


window.addEventListener("load", () => {
  clock();

  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    const time = hour + ":" + minute + ":" + second;

    document.getElementById("time").innerHTML = time;
    setTimeout(clock, 1000);
  }
});

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');

* {
  font-family: 'Outfit', sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}

body {
  background-color: #FFF5DE;
}

.ytb {
  text-align: center;
  margin-top: 16px;
  user-select: none;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10vw;
  margin-left: 10vw;
  align-items: center;
}

footer {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  width: 100%;
}

#time {
  font-size: 28px;
}

/* TEXT UNDERLINE */
.name {
  display: inline-block;
  position: relative;
  color: #79624c;
}

.name:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #79624c;
  transform-origin: bottom right;
  transition: transform 0.5s ease-out;
}

.name:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* SWITCH */
#switch_youtube {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 16px;
  margin-right: 10vw;
}

.switch {
  position: absolute;
  justify-content: flex-end;
  display: inline-block;
  width: 40px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #79624c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #79624c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 16px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
