<template>
  <li>
    <div v-if="!state.addNew">
      <label class="new-placeholder">Add new item</label>
      <button class="add" @click="state.addNew=true">+</button>
    </div>
    <form @submit.prevent="addStep"
          v-else>
      <input
          class="step-input"
          type="text"
          placeholder="Enter a new task"
          @blur="state.addNew=false"
          v-model="state.text"
          v-focus>
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
        todo_id:this.todo_id,
        addNew:false
      }
    }
  },
  methods:{
    addStep: function(){
      let item = {
        todoItemId:this.todo_id,
        stepText:this.state.text,
        createdOn:new Date(),
        isCompleted:false
      }
      console.log(item)
      this.$store.dispatch("addStep",item);
      this.state.text = "";
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
/*.step-input {*/
/*  font-family: "Open Sans", sans-serif;*/
/*  width: 100%;*/
/*  padding: 0.5rem;*/
/*  font-size: 1rem;*/
/*  outline: none;*/
/*  border-radius: 0.25rem;*/
/*  border-style: none;*/
/*  border: solid 1px lightgray;*/
/*  box-sizing: border-box;*/
/*}*/


</style>