<template>
  <div id="app">
    <header>
      <Welcome/>
      <h3 id="time"></h3>
    </header>
    <to-do-list></to-do-list>
    <div class="ytb">
      <iframe width="80%" height="400" src="https://www.youtube.com/embed/MCkTebktHVc?autoplay=1&mute=1" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
      </iframe>
    </div>
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
  background-color: #FFF5DE;
  font-family: 'Outfit', sans-serif;
}

.ytb {
  text-align: center;
  margin-top: 16px;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 10vw;
  margin-left: 10vw;
  align-items: center;
}

#time {
  font-size: 20px;
}
</style>
