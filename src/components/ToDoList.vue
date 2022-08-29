<template>
  <div class="container">
    <div id="todolist">
      <div id="input">
        <input @keydown.enter="addItem(item)" type="text" name="todo" id="todo_input" v-model="item"
               placeholder="Ex: Finir exos maths">
        <button @click="addItem(item)" id="add_button" :disabled="this.item === ''">+</button>
      </div>
      <div id="liste" ref="todoList">
        <div v-for="item in items" :key="item.text" class="item" :id=item :class="item.isPinned? 'pinned' : ''">
          <div class="text">
            {{ item.text }}
          </div>
          <div id="emojis">
            <div @click="pinItem(item)" id="pin">
              📌
            </div>
            <div @click="removeItem(item)" id="trash">
              🗑
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ToDoList",
  data() {
    return {
      item: "",
      items: JSON.parse(this.$store.getters.globalState.currentItems)
    }
  },
  methods: {
    addItem(item) {
      const trimmedItem = item.trim();
      const found = this.items.some(item => item.text === trimmedItem)
      if (trimmedItem.length > 0 && !(found)) {
        this.items.unshift({
          text: trimmedItem,
          isPinned: false
        });
      }
      this.sortArrayPinnedElements()
      this.clearItem()
      this.saveCurrentItems()
    },
    removeItem(item) {
      this.items = this.items.filter(e =>
          e !== item
      )
      this.$store.commit("addItemFinished", item);
      this.clearItem()
      this.saveCurrentItems()
      localStorage.setItem("nbItemsFinished", this.$store.getters.itemsFinished.length);
    },
    clearItem() {
      this.item = ""
    },
    pinItem(item) {
      if (item.isPinned) {
        item.isPinned = false
        this.sortArrayPinnedElements()
      } else {
        item.isPinned = true
        const list = document.getElementById("liste");
        if (window.scrollY !== 0 || list.scrollTop !== 0) {
          list.scrollTo({top: 0, behavior: 'smooth'});
        }
        this.sortArrayPinnedElements()
        this.saveCurrentItems()
      }
    },
    sortArrayPinnedElements() {
      this.items.sort((a, b) => {
        if (a.isPinned && !b.isPinned) {
          return -1
        } else if (!a.isPinned && b.isPinned) {
          return 1
        } else {
          return 0
        }
      })
    },
    saveCurrentItems() {
      localStorage.setItem("currentItems", JSON.stringify(this.items));
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-height: 825px;
  height: 100%;
}

#todolist {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#todo_input {
  font-size: 1.2rem;
  width: 100%;
  min-width: 150px;
  height: 52px;
  padding: 12px 20px;
  margin-right: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 3px solid #87725f;
}

#todo_input:hover {
  border: 3px solid #5b4b3e;
}

#todo_input:focus {
  outline: none !important;
  border: 3px solid #5b4735;
}

#input {
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 8px;
  vertical-align: baseline;
}

#add_button {
  font-size: 2rem;
  line-height: 1;
  width: 52px;
  min-width: 52px;
  height: 52px;
  border-radius: 16px;
  border: 3px solid #504746;
  background-color: #504746;
  color: white;
  user-select: none;
  text-align: center;
}

#add_button:disabled {
  border: 3px solid #928585;
  background-color: #928585;
  pointer-events: none;
}

#add_button:hover {
  border: 3px solid #413838;
  background-color: #413838;
}

#add_button:active {
  border: 3px solid #2f2828;
  background-color: #2f2828;
}

#liste {
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  margin-top: 8px;
  overflow: auto;
  padding-left: 16px;
  padding-bottom: 16px;
}

.item {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 8px;
  align-items: center;
  padding: 12px 22px 12px 22px;
  border-radius: 12px;
  min-width: 82px;
  word-break: break-all;
  background-color: white;
}

.item:hover {
  box-shadow: #79624c 0px 1px 6px 0px;
}

.pinned {
  box-shadow: inset 0px 0px 0px 3px #fd7e7e;
}

.pinned:hover {
  box-shadow: inset 0px 0px 0px 3px #ea0000;
}

#emojis {
  display: flex;
  cursor: pointer;
  margin-left: 8px;
}

#emojis > div {
  margin-left: 8px;
}

/* ********** */
/* RESPONSIVE */
/* ********** */

@media (max-width: 835px) {
  #todolist {
    padding-right: 16px;
    padding-left: 16px;
  }

  #liste {
    padding-bottom: 8px;
    padding-left: 16px;
    max-height: 230px;
    height: 100%;
    overflow: auto;
  }
}
</style>