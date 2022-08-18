<template>
  <div id="container-infos">
    <div id="date-time">
      <div id="date">
        {{ this.date }}
      </div>
      <div id="time">
        {{ this.time }}
      </div>
    </div>
    <hr>
    <div id="word-definition">
      <div id="word">
        {{ this.word.word }}
      </div>
      <div id="definition">
        {{ this.word.definition }}
      </div>
      <div id="btn">
        <button @click="getNewWordEveryday" id="fetch">
          Générer un mot
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Stats",
  data() {
    return {
      date: "",
      time: "",
      word: {
        word: "",
        definition: "",
      },
    }
  },
  methods: {
    generateDateOfTheDay() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      this.date = this.prettyPrintDate(date, day, month);
      setTimeout(() => {
        this.generateDateOfTheDay();
      }, 1000);
    },
    prettyPrintDate(date, day, month) {
      const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      const dayOfTheWeek = days[date.getDay()];
      const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
      return `${dayOfTheWeek}, ${day} ${months[month - 1]}`;
    },
    getCurrentTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      this.time = this.prettyPrintTime(hours, minutes);
      setTimeout(() => {
        this.getCurrentTime();
      }, 1000);
    },
    prettyPrintTime(hours, minutes) {
      return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    },
    getNewWordEveryday() {
      // fetch a new english word everyday
      fetch("https://random-word-api.herokuapp.com/word?number=1")
        .then(response => response.json())
        .then(data => {
          // uppercase first letter of data[0]
          this.word.word = data[0].charAt(0).toUpperCase() + data[0].slice(1);
          this.getDefinition(this.word.word);
          this.word.word += " : "
        })
    },
    getDefinition(word) {
      const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
      return fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              this.word.definition = data[0].meanings[0].definitions[0];
            } else {
              // get another word if the word is not found
              this.getNewWordEveryday();
            }
            this.word.definition = data[0].meanings[0].definitions[0].definition;
          }).catch(error => {
              console.log(error);
          });
    }
  },
  created() {
    this.generateDateOfTheDay();
    this.getCurrentTime();
    this.getNewWordEveryday()
  }
}
</script>

<style scoped>

#container-infos {
  position: relative;
  background: #504746;
  width: 100%;
  border-radius: 16px;
  padding: 16px 24px 18px 24px;
  color: white;
  max-height: 320px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0) 0px 4px 10px;
}

#date-time {
  display: flex;
  justify-content: space-between;
  font-size: 36px;
}

@media (max-width: 1400px) {
  #time {
    display: none;
  }
}

#word-definition {
  margin-top: 16px;
}

#word {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #b4c2ff;
}

#definition {
  font-size: 20px;
  font-weight: lighter;
}

#btn {
  text-align: center;
  margin-top: 24px;
}

#btn > button {
  font-size: 20px;
  padding: 8px;
}

</style>