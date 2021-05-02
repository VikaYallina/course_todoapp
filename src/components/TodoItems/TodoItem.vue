<template>
  <v-card tile
          max-width="900"
          class="mx-auto"
          color=getColor>
      <v-card-title v-bind:class="{done: todo.completed}">
      <v-checkbox  v-model="todo.completed"
             v-on:change=toggleTodo(todo.id) />
      <input
          v-if="state.edit"
          v-model="todo.text"
          @blur="editTodo(todo.id, $event.target.value); state.edit = false;"
          @keyup.enter="editTodo(todo.id, $event.target.value); state.edit = false;"
          v-focus
      />
          <label v-else @click="state.edit=true;">{{todo.text}}</label>

    </v-card-title>

    <button class="edit-todo"
            @click="showModal">edit</button>

    <button class="delete"
              @click=deleteTodo(todo.id)>&times;</button>

    <StepList v-bind:todo_id="todo.id"
              class="list"
    ></StepList>

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
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
              color="indigo"
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
                    v-model="todo.complete_by"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="todo.complete_by"
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
                         color="green accent-4">
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
                @click="dialog.value = false"
            >Save</v-btn>
            <v-btn
                text
                @click="dialog.value = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </v-card>
</template>

<script>
import StepList from "@/components/StepItems/StepList";
import utils from "@/services/utils"
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
    return {
      state: {edit:false,
              modal_edit: false,
              mod_edit_text: this.todo.text,
              mod_importance:this.todo.importance_lvl,
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialog:false,
    }
  },
  methods:{
    toggleTodo: function (id){
      this.$store.dispatch("toggleTodo", id);
    },
    deleteTodo: function(id){
      this.$store.dispatch("deleteTodo",id);
    },
    editTodo: function (id, new_text){
      this.$store.dispatch("editTodo",id,new_text);
    },
    showModal: function(){
      this.$refs.modal.show = true;
    },
    getColor: function (){
      return utils.getColor(this.todo.importance_lvl);
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