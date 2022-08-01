<template>
  <div id="app">
    <header>
      <Welcome/>
      <h3 id="time"></h3>
    </header>
    <to-do-list></to-do-list>
    <div class="ytb" v-show="displayYoutube">
      <iframe width="80%" height="400" src="https://www.youtube-nocookie.com/embed/MCkTebktHVc?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      id="youtube_video">
      </iframe>
    </div>
    <footer>Made with <a href="https://github.com/RemiSaurel/todoapp" target="_blank" class="name">💙</a> by <a href="https://www.linkedin.com/in/r%C3%A9mi-saurel/" target="_blank" class="name">Rémi Saurel</a> </footer>
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

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;

    const time = hour + ":" + minute;

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
  background: -webkit-linear-gradient(  0deg, rgba(255, 253, 226, 1) 0%, rgba(255, 228, 164, 1) 50%, rgba(255, 217, 153, 1) 100%);
}

.ytb {
  text-align: center;
  margin-top: 16px;
  user-select: none;
  position: relative;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
}

iframe{
  position: absolute;
  top: 5%;
  left: 20%;
  width: 60%;
  height: 60%;
  border-radius: 16px;
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

</style>
