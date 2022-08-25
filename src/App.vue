<template>
  <div id="app">
    <div id="container">
      <settings></settings>
      <div id="todo-container">
        <to-do-list></to-do-list>
      </div>
      <div id="right-side">
        <div id="pomodoro">
          <pomodoro></pomodoro>
        </div>
        <div id="ytb-player">
          <ytb-player></ytb-player>
        </div>
      </div>
    </div>
    <footer>
      <div>
        <a href="https://github.com/RemiSaurel/own-workspace" target="_blank" class="underline">
          <img src="../src/res/github.png" alt="github" width="32" height="32">
        </a>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/r%C3%A9mi-saurel/" target="_blank" class="underline">
          <img src="../src/res/linkedin.png" alt="github" width="32" height="32">
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
import Pomodoro from "@/components/Pomodoro";
import YtbPlayer from "@/components/YtbPlayer";
import Settings from "@/components/Settings";

export default {
  name: 'App',
  components: {
    ToDoList,
    Pomodoro,
    YtbPlayer,
    Settings
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
  background: #fdde95;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

footer > div {
  margin-right: 16px;
}

#ytb-player {
  background: #504746;
  margin-top: 16px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0) 0px 4px 10px;
}

#pomodoro {
  width: 100%;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#todo-container {
  width: 40%;
  margin-right: 16px;
}

#right-side {
  display: flex;
  width: 60%;
  flex-direction: column;
  margin-right: 32px;
  margin-left: 32px;
}

/* TEXT UNDERLINE */
.underline {
  display: inline-block;
  position: relative;
  color: #79624c;
}

.underline:after {
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

.underline:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

@media (max-width: 330px) {
  #right-side {
    display: none;
  }
}

@media (max-width: 675px) {
  #todo-container {
    width: 100%;
  }
  #right-side {
    width: auto;
    margin-top: 16px;
  }

  #container {
    display: block;
  }
  #ytb-player {
    display: none;
  }

}

</style>
