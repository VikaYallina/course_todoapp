<template>
<ul class="tasks">
    <Todo v-for="(todo, i) in todos"
          :key="i"
          v-bind:todo="todo"
          v-bind:index="i"
          v-bind:group_id="group_id"
    ></Todo>
</ul>
</template>

<script>
import Todo from "@/components/TodoItems/TodoItem";
export default {
  name: "TodoList",
  components: {Todo},
  props:{
    group_id: Number,
    selected_group: String
  },
  computed:{
    todos() {
      // return this.$store.getters.getTodos;
      switch (this.selected_group){
        case 'today':
          return this.$store.getters.getTodayTodos;
        case 'created':
          return this.$store.getters.getTodoByGroup(this.group_id);
        default:
          return this.$store.getters.getTodos;
      }
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