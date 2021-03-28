<template>
  <li>
    <form @submit.prevent="addStep">
      <input
          class="step-input"
          type="text"
          placeholder="Enter a new task"
          v-model="state.text">
    </form>
  </li>
</template>

<script>
export default {
  name: "NewStep",
  props:{
    todo_id: Number
  },
  data(){
    return{
      state:{
        text:"",
        newId: 0,
        todo_id:this.todo_id
      }
    }
  },
  methods:{
    addStep: function(){
      this.$store.dispatch("addStep",this.state);
      this.state.newId++;
      this.state.text = "";
    }
  }
}
</script>

<style>
.step-input {
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