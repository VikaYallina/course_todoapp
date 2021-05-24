<template>
  <v-container>
    <v-card
            max-width="900"
            class="mx-auto"
            elevation="2"
            :color="color"
            outlined
            shaped>
      <v-card-title v-bind:class="{done: todo.completed}">
        <v-checkbox  v-model="state.is_complete"
                     v-on:change=toggleTodo(todo.id) />
        <input
            v-if="state.edit"
            v-model="state.mod_edit_text"
            @blur="state.mod_edit_text = todo.itemText ;state.edit = false;"
            @keyup.enter="editTodo(todo.id, $event.target.value); state.edit = false;"
            v-focus
        />
        <label v-else @click="state.edit=true;">{{state.mod_edit_text}}</label>

      </v-card-title>

      <v-card-text>
        <StepList v-bind:todo_id="todo.id"
                  class="list"
        ></StepList>
      </v-card-text>

      <v-card-actions >
        <v-dialog v-model="dialog"
                  transition="dialog-bottom-transition"
                  persistent
                  max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
            >From the bottom</v-btn>
          </template>
<!--          <template v-slot:default="dialog">-->
          <template>
            <v-card>
              <v-toolbar
                  :color="color"
                  dark
              >
                <input
                    v-if="state.modal_edit"
                    v-model="state.mod_edit_text"
                    @blur="state.modal_edit = false;"
                    @keyup.enter=" state.modal_edit = false;"
                    v-focus
                />
                <v-card-title v-else @click="state.modal_edit=true;">{{state.mod_edit_text}}</v-card-title>
              </v-toolbar>
              <v-card-text>
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="state.mod_completeBy"
                        label="Picker without buttons"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="state.mod_completeBy"
                      @input="menu = false"
                      color="indigo"
                  ></v-date-picker>
                </v-menu>
                <v-container fluid>
                  <v-radio-group
                      column
                      v-model="state.mod_importance">
                    <template v-slot:label>
                      <div>Уровень важности:</div>
                    </template>
                    <v-radio value="5"
                             color="red accent-4">
                      <template v-slot:label>
                        <div>Очень срочно</div>
                      </template>
                    </v-radio>
                    <v-radio value="4"
                             color="orange accent-4">
                      <template v-slot:label>
                        <div>Важно</div>
                      </template>
                    </v-radio>
                    <v-radio value="3"
                             color="yellow accent-4">
                      <template v-slot:label>
                        <div>Средняя важность</div>
                      </template>
                    </v-radio>
                    <v-radio value="2"
                             color="lime accent-4">
                      <template v-slot:label>
                        <div>Может подождать</div>
                      </template>
                    </v-radio>
                    <v-radio value="1"
                             color="cyan accent-3">
                      <template v-slot:label>
                        <div>Совсем не важно</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="callSave()"
                >Save</v-btn>
                <v-btn
                    text
                    @click="callClose()"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-btn @click=deleteTodo(todo.id)>Delete</v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import StepList from "@/components/StepItems/StepList";
import {getColor, parseDate} from "@/services/utils.js"
export default {
  name: "Todo",
  components: {StepList},

  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number,
    group_id: Number
  },
  data() {
    let data,color;
    if (this.todo.completeBy !=null)
      data = parseDate(this.todo.completeBy);
    if (this.todo.completed)
      color = "green lighten-2";
    else
      color = getColor(this.todo.importanceLvl)
    return {
      state: {edit:false,
              is_complete:this.todo.completed,
              modal_edit: false,
              mod_edit_text: this.todo.itemText,
              mod_importance:this.todo.importanceLvl,
              mod_completeBy:data
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialog:false,
      color:color,
    }
  },
  methods:{
    toggleTodo: function (id){
      let toggleItem = null;
      if (this.state.is_complete) {
        toggleItem = {
          id:id,
          item:{
            isCompleted:this.state.is_complete,
            completedOn:new Date()
          }
        }
      }
      else
        toggleItem = {
          id:id,
          item:{
            isCompleted:this.state.is_complete,
            completedOn:null
          }
        }
      this.$store.dispatch("editTodo",toggleItem)
    },
    deleteTodo: function(id){
      this.$store.dispatch("deleteTodo",id);
    },
    editTodo: function (id,new_text){
      const edit_todo={
        id:id,
        item:{
          itemText:new_text
        }
      }
      this.$store.dispatch("editTodo",edit_todo);
    },
    callClose: function(){
      this.state.mod_edit_text= this.todo.itemText;
      this.state.mod_importance= this.todo.importanceLvl;
      if (this.todo.completeBy != null)
        this.state.mod_completeBy= parseDate(this.todo.completeBy);
      this.dialog = false;
    },
    callSave: function(){
      const edit_todo = {
        item:{
          itemText:this.state.mod_edit_text,
          completeBy:this.state.mod_completeBy,
          importanceLvl:this.state.mod_importance
        },
        id:this.todo.id
      }
      this.$store.dispatch("editTodo",edit_todo);
      this.dialog = false;
    }
  },


  watch: {
    todo: function (newVal) { // watch it
      if (newVal.completed)
        this.color = "green lighten-2";
      else
        this.color = getColor(newVal.importanceLvl)
      this.state.mod_edit_text = newVal.itemText;
      this.state.mod_importance = newVal.importanceLvl;
      if (newVal.completeBy != null)
        this.state.mod_completeBy = parseDate(newVal.completeBy);
      this.state.is_complete = newVal.completed;
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
.todo {
  width: 45rem;
  padding: 10px;
  margin-bottom: 0.5rem;
  border: 0.5px solid #999;
  border-radius: 5px;
  color: #34495e;
  font-weight: bold;
}

.todo:before {
  content: "\2002";
}

/*.todo:hover {*/
/*  cursor: pointer;*/
/*}*/

.done {

  color: #41b883;
}

/*.done:before {*/
/*  content: "\2714";*/
/*}*/

.delete {
  display: block;
  float: right;
  color: #d22;
  width: 1.25rem;
  height: 1.25rem;
  text-align: center;
}

.edit-todo{
  float: right;
}

.list{
  padding-left: 10%
}
</style>