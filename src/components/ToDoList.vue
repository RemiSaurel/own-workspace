<template>
  <div class="container">
    <div id="todolist">
      <div id="input">
        <input @keydown.enter="addItem(item)" type="text" name="todo" id="todo_input" v-model="item"
               placeholder="Ex: Finir exos maths">
        <button @click="addItem(item)" id="add_button">+</button>
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
  </div>
</template>

<script>

export default {
  name: "ToDoList",
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
    max-height: 770px;
    overflow: auto;
    height: 100%;
  }

  #pomodoro {
    width: 50%;
    margin-right: 32px;
  }

  #todolist {
    display: flex;
    flex-direction: column;
    margin-left: 32px;
    width: 100%;
  }

  #todo_input {
    font-size: 1.2rem;
    width: 100%;
    min-width: 150px;
    height: 52px;
    padding: 12px 20px;
    margin: 8px 16px 0px 0px;
    box-sizing: border-box;
    border-radius: 16px;
    border: 3px solid #a59182;
  }

  #todo_input:hover {
    border: 3px solid #87725f;
  }

  #todo_input:focus {
    outline: none !important;
    border: 3px solid #5b4735;
  }

  #input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #add_button {
    font-size: 2rem;
    line-height: 1;
    width: 52px;
    min-width: 52px;
    height: 52px;
    margin: 8px 16px 0px 0px;
    border-radius: 16px;
    border: 3px solid #79624c;
    background-color: #79624c;
    color: white;
  }

  #add_button:hover {
    border: 3px solid #5b4735;
    background-color: #5b4735;
    color: white;
  }

  #add_button:active {
    border: 3px solid #3a2b18;
    background-color: #3a2b18;
    color: white;
  }

  #liste {
    display: flex;
    flex-direction: column;
    padding-right: 16px;
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

  #trash {
    font-size: 20px;
    padding-left: 8px;
    cursor: pointer;
  }

  @media (max-width: 675px) {
    #add_button {
      margin-right: 0;
      margin-top: 8px;
    }
    #todolist {
      margin-right: 32px;
    }
    #liste {
      padding-right: 0;
      margin-top: 8px;
      max-height: 320px;
      height: 100%;
      overflow: auto;
    }
  }
</style>