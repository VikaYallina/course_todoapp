<template>
<form @submit.prevent="addTodo">
  <input
      class="todo-input"
      type="text"
      placeholder="Enter a new task"
      v-model="newTodo.itemText">
</form>
</template>

<script>
export default {
name: "NewTodo",
  data(){
    return {
      newTodo:{
        itemText:"",
      }
    }
  },
  props:{
    group_id:Number
  },
  methods:{
    addTodo: function(){
      const newTodo = {
        groupId:this.group_id,
        itemText:this.newTodo.itemText,
      }
      this.$store.dispatch("addTodo",newTodo);
      this.newTodo.itemText = "";
    }
  }
}
</script>

<style >
.todo-input {
  font-family: "Open Sans", sans-serif;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  border-radius: 0.25rem;
  border-style: none;
  border: solid 1px lightgray;
  box-sizing: border-box;
}
</style>