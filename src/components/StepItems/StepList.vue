<template>
  <ul >
    <Step v-for="(step, i) in steps(todo_id)"
          :key="i"
          v-bind:step="step"
          v-bind:index="i"
    ></Step>
    <div v-if="!addNew">
      <label class="new-placeholder">Add new item</label>
      <button class="add" @click="addNew=true">+</button>
    </div>
    <NewStep v-bind:todo_id="this.todo_i"
             v-else
             @blur="addNew=false"
             v-focus
    ></NewStep>
  </ul>
</template>

<script>
import Step from './Step'
import NewStep from "@/components/StepItems/NewStep";
export default {
name: "StepList",
  components:{
    NewStep,
    Step
  },
  props:{
    todo_id: Number
  },
  data(){
    return {
      todo_i:this.todo_id,
      addNew:false
    }
  },
  methods:{
    steps(id){
      return this.$store.getters.getStepsByTodo(id);
    }
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
.new-placeholder{
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

.add{
  display: block;
  float: right;
  color: #d22;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
}
</style>