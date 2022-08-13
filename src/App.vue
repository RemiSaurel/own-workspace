<template>
  <div id="app">
    <div class="pause"></div>
    <to-do-list></to-do-list>
    <div class="aside">
      <div class="ytb" v-show="displayYoutube">
        <iframe width="100%" height="388" src="https://www.youtube-nocookie.com/embed/MCkTebktHVc?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                id="youtube_video">
        </iframe>
      </div>
    </div>
    <footer>Made with <a href="https://github.com/RemiSaurel/todoapp" target="_blank" class="name">💙</a> by <a href="https://www.linkedin.com/in/r%C3%A9mi-saurel/" target="_blank" class="name">Rémi Saurel</a> </footer>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
export default {
  name: 'App',
  components: {
    ToDoList,
  },
  data() {
    return {
      displayYoutube: true
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400&display=swap');

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

footer {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  width: 100%;
}

.ytb {
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 16px;
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
