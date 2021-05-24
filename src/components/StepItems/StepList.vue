<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header><h4>Steps</h4></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider></v-divider>
          <v-list flat>
              <Step v-for="(step, i) in steps(todo_id)"
                    :key="i"
                    v-bind:step="step"
              ></Step>
              <NewStep v-bind:todo_id="todo_id"></NewStep>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
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
  methods:{
    steps(id){
      if (this.$store.getters.getSteps.length !== 0)
        return this.$store.getters.getStepsByTodo(id);
      else
        return [];
    }
  },


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