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
import Todo from "@/components/TodoItems/Todo";
export default {
  name: "TodoList",
  components: {Todo},
  props:{
    group_id: Number,
    action: Number
  },
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
  width: 45rem;
}


</style>