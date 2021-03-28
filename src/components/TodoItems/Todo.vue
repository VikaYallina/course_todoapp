<template>
  <li class="todo">
      <span v-bind:class="{done: todo.completed}">
      <input type="checkbox" :checked="todo.completed"
             v-on:change=toggleTodo(todo.id) />
      <input
          v-if="state.edit"
          v-model="todo.text"
          @blur="editTodo(todo.id, $event.target.value); state.edit = false;"
          @keyup.enter="editTodo(todo.id, $event.target.value); state.edit = false;"
          v-focus
      />
          <label v-else @click="state.edit=true;">{{todo.text}}</label>

    </span>

    <button class="edit-todo"
            @click="showModal">edit</button>

    <button class="delete"
              @click=deleteTodo(todo.id)>&times;</button>

    <StepList v-bind:todo_id="todo.id"
              class="list"
    ></StepList>

    <modal-window ref="modal">
      <template v-slot:header>
        <input
            v-if="state.modal_edit"
            v-model="state.mod_edit_text"
            @blur="state.modal_edit = false;"
            @keyup.enter=" state.modal_edit = false;"
            v-focus
        />
        <label v-else @click="state.modal_edit=true;">{{state.mod_edit_text}}</label>
      </template>
      <template v-slot:body>
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
                v-model="state.complete_by"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="state.complete_by"
              @input="menu = false"
              color="green"
          ></v-date-picker>
        </v-menu>
      </template>
      <template slot="footer">
        <v-row
          align="right"
          justify="space-around"
        >
          <v-btn @click="completeModal(todo.id)" color="success">
            Edit
          </v-btn>
          <v-btn @click="closeModal()" color="error">
            Close
          </v-btn>
        </v-row>
      </template>
    </modal-window>
  </li>
</template>

<script>
import StepList from "@/components/StepItems/StepList";
import ModalWindow from "@/components/Modal";
export default {
  name: "Todo",
  components: {StepList, ModalWindow},

  props: {
    todo: {
      type: Object,
      required: true
    },
    index: Number
  },
  data() {
    return {
      state: {edit:false,
              modal_edit: false,
              complete_by: this.todo.complete_by,
              mod_edit_text: this.todo.text
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false
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
      this.$refs.modal.show = true
    },
    closeModal:function(){
      this.$refs.modal.show = false
    },
    completeModal:function(id, text, complete_by, imp_lvl){
      this.$store.dispatch("fullEditTodo", id, text, complete_by, imp_lvl)
      this.$refs.modal.show = false
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
  text-decoration: line-through;
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