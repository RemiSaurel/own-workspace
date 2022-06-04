<template>
  <div id="todolist">
    <input @keydown.enter="addItem(item)" type="text" name="todo" id="todo_input" v-model="item"
    placeholder="Insérer votre todo">
    <div id="liste">
      <div v-for="item in items" :key="item.id" class="item">
        <div id="text">
          {{item}}
        </div>
        <div @click="removeItem(item)" id="trash">
          🗑
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ToDoList",
  components: {},
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
      this.items = this.items.filter(e => e !== item)
      this.item = ""
    }
  }
}
</script>

<style scoped>
  #todolist {
    text-align: center;
  }

  #todo_input {
    font-size: 1.2rem;
    width: 50%;
    max-width: 400px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 16px;
    border: 2px solid saddlebrown;
  }

  #todo_input:focus {
    outline: none !important;
    border: 2px solid #8783D1;
  }

  #liste {
    display: flex;
    flex-direction: column;
  }

  .item {
    display: flex;
    font-size: 18px;
    margin-top: 8px;
    align-items: center;
    padding: 8px 10px 8px 10px;
    border-radius: 12px;
    max-width: 50vw;
    box-shadow: rgba(111, 111, 111, 0.2) 0px 7px 29px 0px;
    margin-left: auto;
    margin-right: auto;
    word-break: break-all;
  }

  .item:hover {
    box-shadow: #ff0000 0px 1px 6px 0px;
  }

  #trash {
    font-size: 20px;
    padding: 8px;
    cursor: pointer;
  }
</style>