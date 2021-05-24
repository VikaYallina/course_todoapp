<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox
          @change="completeStep(step.id)"
      v-model="state.isComplete"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        <input
            v-if="state.edit"
            v-model="state.edit_text"
            @blur="state.edit_text = step.stepText ;state.edit = false;"
            @keyup.enter="editStep(step.id, $event.target.value); state.edit = false;"
            v-focus
        />
        <label v-else @click="state.edit=true;">{{state.edit_text}}</label>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
        <v-btn icon @click="deleteStep(step.id)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "Step",
  props:{
    step:{
      type: Object,
      required: true
    },
  },
  data(){
    return{
      state:{
        edit:false,
        edit_text:this.step.stepText,
        isComplete:this.step.completed,
      }
    }
  },
  methods:{
    editStep: function (id,new_text){
      let edit_step = {
        id:id,
        item:{
          stepText:new_text,
          isCompleted:this.step.completed
        }
      }
      console.log(edit_step)
      this.$store.dispatch("editStep",edit_step);
    },
    completeStep: function (id){
      let step = {
        id:id,
        item:{
          isCompleted:this.state.isComplete,
          stepText:this.step.stepText
        }
      }
      this.$store.dispatch("editStep",step);
    },
    deleteStep: function (id){
      this.$store.dispatch("deleteStep",id);
    }
  },
  watch:{
    step: function(newVal){
      this.state.edit_text = newVal.stepText;
      this.state.isComplete = newVal.completed;
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
.step{
  padding: 10px;
  margin-bottom: 0.5rem;
  border: 0.5px solid #999;
  border-radius: 5px;
  color: #34495e;
  font-weight: bold;
}
</style>