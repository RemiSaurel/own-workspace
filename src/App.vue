<template>
  <div id="app">
    <div id="container">
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
    <footer>Made with <a href="https://github.com/RemiSaurel/todoapp" target="_blank" class="name">💙</a> by <a href="https://www.linkedin.com/in/r%C3%A9mi-saurel/" target="_blank" class="name">Rémi Saurel</a> </footer>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
import Pomodoro from "@/components/Pomodoro";
import YtbPlayer from "@/components/YtbPlayer";

export default {
  name: 'App',
  components: {
    ToDoList,
    Pomodoro,
    YtbPlayer
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
footer {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  width: 100%;
}

#ytb-player {
  background: #504746;
  margin-top: 16px;
  border-radius: 16px;
  padding: 0 24px 12px 24px;
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
  width: 30%;
  margin-right: 16px;
}

#right-side {
  display: flex;
  width: 60%;
  flex-direction: column;
  margin-right: 32px;
  margin-left: 32px;
}

@media (max-width: 330px) {
  #right-side {
    display: none;
  }
}

@media (max-width: 535px) {
  #todo-container {
    width: 100%;
  }
  #right-side {
    width: auto;
    margin-top: 16px;
  }
  #time {
    font-size: 32px!important;
  }

  #todolist {
    margin-right: 32px;
  }
  #container {
    display: block;
  }
  #ytb-player {
    display: none;
  }
  #container-infos {
    display: none;
  }
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
