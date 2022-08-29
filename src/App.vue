<template>
  <div id="app">
    <div id="container">
      <div id="nav-bar">
        <settings></settings>
        <socials></socials>
      </div>
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
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
import Pomodoro from "@/components/Pomodoro";
import YtbPlayer from "@/components/YtbPlayer";
import Settings from "@/components/Settings";
import Socials from "@/components/Socials";

export default {
  name: 'App',
  components: {
    ToDoList,
    Pomodoro,
    YtbPlayer,
    Settings,
    Socials
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

#nav-bar {
  margin-top: 8px;
  margin-left: 16px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
}

#ytb-player {
  background: #504746;
  margin-top: 16px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0) 0px 4px 10px;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#todo-container {
  width: 40%;
}

#right-side {
  display: flex;
  width: 60%;
  flex-direction: column;
  margin-right: 32px;
  margin-left: 32px;
}

/* ********** */
/* RESPONSIVE */
/* ********** */

@media (max-width: 835px) {
  #container {
    flex-direction: column;
  }

  #todo-container {
    width: 100%;
  }

  #right-side {
    margin-right: 32px;
    margin-left: 32px;
    width: auto;
  }
}

@media (max-width: 330px) {
  #right-side {
    display: none;
  }
}
</style>
