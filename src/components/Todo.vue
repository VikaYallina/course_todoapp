<template>
  <li class="todo">
      <span v-bind:class="{done: todo.completed}">
      <input type="checkbox" :checked="todo.completed"
             v-on:change=toggleTodo(todo.id) />
      <input
          v-if="todo.edit"
          v-model="todo.text"
          @blur="editTodo(todo.id, $event.target.value)"
          @keyup.enter="editTodo(todo.id, $event.target.value)"
          v-focus
      />

          <label v-else @click="todo.edit=true;">{{todo.text}}</label>

    </span>
      <button class="delete"
              @click=deleteTodo(todo.id)
      >&times;</button>
  </li>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number
  },
  methods:{
    toggleTodo: function (id){
      this.$store.dispatch("toggleTodo", id);
    },
    deleteTodo: function(id){
      this.$store.dispatch("deleteTodo",id);
    },
    editTodo: function (id, new_text){
      this.$store.dispatch("editTodo",id,new_text);
      this.todo.edit = false;
    },
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style>
.todo {
  padding: 10px;
  margin-bottom: 0.5rem;
  border: 0.5px solid #999;
  border-radius: 5px;
  color: #34495e;
  font-weight: bold;
}

.todo:before {
  content: "\2002";
}

/*.todo:hover {*/
/*  cursor: pointer;*/
/*}*/

.done {
  text-decoration: line-through;
  color: #41b883;
}

/*.done:before {*/
/*  content: "\2714";*/
/*}*/

.delete {
  display: block;
  float: right;
  color: #d22;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
}
</style>