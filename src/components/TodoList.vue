<template>
<ul class="tasks">
    <Todo v-for="(todo, i) in todos"
          :key="i"
          v-bind:todo="todo"
          v-bind:index="i"
    ></Todo>
</ul>
</template>

<script>
import Todo from "@/components/Todo";
export default {
  name: "TodoList",
  components: {Todo},
  computed:{
    todos() {
      return this.$store.getters.getTodos;
    }
  },

}
</script>

<style >
.tasks {
  padding: 0;
  list-style-type: none;
}


</style>