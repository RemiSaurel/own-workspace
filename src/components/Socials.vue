<template>
  <div id="socials-container">
    <div>
      <a href="https://github.com/RemiSaurel/own-workspace" target="_blank">
        <img src="../res/github.png" alt="github" width="32" height="32">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "socials"
}
</script>

<style scoped>
#socials-container {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

@media (max-width: 675px) {
  #socials-container {
    display: none;
  }

}
</style>