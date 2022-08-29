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
    <div id="word-definition" v-if="displayWord">
      <div id="word">
        {{ this.word.word }}
      </div>
      <div id="definition">
        {{ this.word.definition }}
      </div>
      <div id="btn-newword">
        <button @click="getNewWordEveryday" id="fetch" class="btn">
          📝 Generate a word
        </button>
      </div>
      <hr>
    </div>
    <div id="stats">
      <div class="center" v-if="displayWord">
        <button @click="displayWord = false" class="btn">
          📊 Session stats
        </button>
      </div>
      <div v-else>
        Total todo: {{ this.nbItemsFinished }}
        <br>
        Total sessions: {{ this.nbSessions }}
        <br>
        <span id="hint">(last + current session)</span>
        <div class="center">
          <button @click="resetStats" class="btn" id="reset-stats" :disabled="resetDone">
            🔁 Reset last session
          </button>
          <br>
          <button class="btn" id="see-words" @click="displayWord = true">
            🇬🇧 English word
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  data() {
    return {
      date: '',
      time: '',
      word: {
        word: '',
        definition: '',
      },
      displayWord: true,
      resetDone: false
    };
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
      const days = [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi'];
      const dayOfTheWeek = days[date.getDay()];
      const months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'];
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
      return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ?
          '0' + minutes :
          minutes}`;
    },
    getNewWordEveryday() {
      document.getElementById('fetch').disabled = true;
      // fetch a new english word everyday
      fetch('https://random-word-api.herokuapp.com/word?number=1').
          then(response => response.json()).
          then(data => {
            // uppercase first letter of data[0]
            const word = data[0];
            this.getDefinition(word);
          });
    },
    getDefinition(word) {
      const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
      return fetch(url).then(response => response.json()).then(data => {
        if (data.length > 0) {
          document.getElementById('fetch').disabled = false;
          const wordUppercased = word.charAt(0).toUpperCase() + word.slice(1);
          this.word.word = wordUppercased + ' : ';
          this.word.definition = data[0].meanings[0].definitions[0].definition;
        } else {
          // get another word if the word is not found
          this.getNewWordEveryday();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    resetStats() {
      this.resetDone = true;
      this.$store.commit('resetStats');
    },
  },
  mounted() {
    this.generateDateOfTheDay();
    this.getCurrentTime();
    this.getNewWordEveryday();
  },
  computed: {
    nbItemsFinished() {
      return parseInt(this.$store.getters.globalState.nbItemsFinished) + this.$store.getters.itemsFinished.length
    },
    colorSelected() {
      return this.$store.getters.colorSelected;
    },
    nbSessions() {
      return parseInt(this.$store.getters.globalState.nbSessions) + this.$store.getters.nbSessions
    }
  },
  watch: {
    colorSelected: function(color) {
      if (this.displayWord) {
        document.getElementById('word').style.color = color;
      }
    },
  },
};
</script>

<style scoped>

#container-infos {
  position: relative;
  background: #504746;
  width: 100%;
  border-radius: 16px;
  padding: 16px 24px 18px 24px;
  color: white;
  overflow: auto;
  box-shadow: rgba(0, 0, 0) 0px 4px 10px;
}

#date-time {
  display: flex;
  justify-content: space-between;
  font-size: 36px;
}

#word-definition {
  margin-top: 16px;
}

#word {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fdde95;
}

#definition {
  font-size: 20px;
  font-weight: lighter;
}

#btn-newword {
  text-align: center;
  margin-top: 16px;
}

.btn {
  font-size: 20px;
  padding: 8px;
  margin-bottom: 8px;
}

#stats {
  font-size: 28px;
  margin-top: 16px;
}

.center {
  text-align: center;
}

#hint {
  font-size: 18px;
  font-weight: lighter;
}

#reset-stats {
  margin-top: 16px;
}

#see-words {
  margin-top: 8px;
}

/* ********** */
/* RESPONSIVE */
/* ********** */

@media (max-width: 1400px) {
  #time {
    display: none;
  }
}

@media (max-width: 835px) {
  #container-infos {
    width: 50%;
    margin-left: 8px;
  }
}


@media (max-width: 550px) {
  #container-infos {
    display: none;
  }
}

</style>