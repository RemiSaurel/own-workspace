<template>
  <div class="container">
    <div id="todolist">
      <div>
        <input @keydown.enter="addItem(item)" type="text" name="todo" id="todo_input" v-model="item"
               placeholder="Ex: Finir exos maths">
      </div>
      <div id="liste">
        <div v-for="item in items" :key="item" class="item">
          <div id="text">
            {{item}}
          </div>
          <div @click="removeItem(item)" id="trash">
            🗑
          </div>
        </div>
      </div>
    </div>

    <div id="pomodoro">
      <pomodoro></pomodoro>
    </div>
  </div>
</template>

<script>

import Pomodoro from "@/components/Pomodoro";

export default {
  name: "ToDoList",
  components: {
    Pomodoro
  },
  data() {
    return {
      item: "",
      items: []
    }
  },
  methods: {
    addItem(item) {
      if (item.trim() !== "") {
        this.items.push(item)
        this.item = ""
      }
    },
    removeItem(item) {
      this.items = this.items.filter(e =>
          e !== item
      )
      this.item = ""
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-between;
  }

  #pomodoro {
    width: 50%;
    margin-right: 32px;
  }

  #todolist {
    display: flex;
    flex-direction: column;
    margin-left: 32px;
    width: 40%;
  }

  #todo_input {
    font-size: 1.2rem;
    width: 100%;
    height: 52px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 16px;
    border: 3px solid #79624c;
  }

  #todo_input:focus {
    outline: none !important;
    border: 3px solid #343197;
  }

  #liste {
    display: flex;
    flex-direction: column;
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
    max-width: 40vw;
    box-shadow: rgba(111, 111, 111, 0.2) 0px 7px 29px 0px;
    word-break: break-all;
    background-color: white;
  }

  .item:hover {
    box-shadow: #ff0000 0px 1px 6px 0px;
  }

  #trash {
    font-size: 20px;
    padding-left: 8px;
    cursor: pointer;
  }
</style>