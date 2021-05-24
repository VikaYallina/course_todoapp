<template>
<v-col>
    <Todo v-for="(todo, i) in todo"
          :key="i"
          v-bind:todo="todo"
          v-bind:index="i"
          v-bind:group_id="group_id"
    ></Todo>
</v-col>
</template>

<script>
import Todo from "@/components/TodoItems/TodoItem";
// import {mapActions} from "vuex";
export default {
  name: "TodoList",
  components: {Todo},
  props:{
    group_id: Number,
    selected_group: String
  },
  data(){
    return{
      todos:this.$store.getters.getTodos,
    }
  },
  computed:{
    todo() {
      // return this.$store.getters.getTodos;
      if (this.$store.getters.allTodos.length === 0){
        return [];
      }else{
        switch (this.selected_group){
          case 'today':
            return this.$store.getters.getTodayTodos;
          case 'completed':
            return this.$store.getters.getCompletedTodos;
          case 'important':
            return this.$store.getters.getImportantTodos;
          case 'planned':
            return this.$store.getters.getPlannedTodos;
          case 'created':
            return this.$store.getters.getTodos;
          default:
            return [];
        }
      }
    },
  },
  // methods:{
  //   ...mapActions([
  //     'initByGroup'
  //   ])
  // },
  // updated(){
  //   console.log(this.selected_group);
  //   this.$nextTick(async () => {
  //     await this.initByGroup();
  //   });
  // }

}
</script>

<style >
.tasks {
  padding: 0;
  list-style-type: none;
  width: 45rem;
}


</style>