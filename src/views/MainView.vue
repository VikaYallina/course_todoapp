<template>

    <div class="container">
<!--      <v-app>-->
<!--    <h1>To-Do List</h1>-->
<!--    <div id="app">-->
<!--      <div class="group-container">-->

<!--      </div>-->
<!--      <div class="todo-container">-->
<!--        <NewTodo />-->
<!--        <TodoList />-->
<!--      </div>-->
<!--    </div>-->

<!--          <v-app id="inspire">-->
            <v-navigation-drawer
                v-model="drawer"
                app
            >
              <v-list dense>
                <v-list-item link v-on:click="selected_group='today'">
                  <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Today</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link v-on:click="selected_group='planned'">
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Planned</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link v-on:click="selected_group='important'">
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Important</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="selected_group='completed'">
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Completed</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <GroupList @got_id="selectGroup"/>
                <NewGroup />
              </v-list>

            </v-navigation-drawer>

<!--            <v-app-bar-->
<!--                app-->
<!--                color="indigo"-->
<!--                dark-->
<!--            >-->
<!--              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
<!--              <v-toolbar-title>Application</v-toolbar-title>-->
<!--            </v-app-bar>-->

<!--            <v-main>-->
              <v-container
                  class="fill-height"
                  fluid
              >
                <v-row align="center" justify="center">
                  <NewTodo :group_id="group_id"/>
                </v-row>
                <v-row align="center" justify="center" >
                  <TodoList :selected_group="selected_group" :group_id="group_id"/>
                </v-row>
              </v-container>
<!--            </v-main>-->
            <v-footer
                color="indigo"
                app
            >
              <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
            </v-footer
            >
<!--          </v-app>-->
      </div>

<!--      </v-app>-->

</template>

<script>
import NewTodo from "@/components/TodoItems/NewTodo";
import TodoList from "@/components/TodoItems/TodoList";
import GroupList from "@/components/TodoGroup/GroupList";
import NewGroup from "@/components/TodoGroup/NewGroup";
import { mapActions } from 'vuex';
export default {
  name: 'MainView',

  components: {
    GroupList,
    TodoList,
    NewTodo,
    NewGroup
  },

  data: () => ({
    drawer: true,
    selected_group:'none',
    group_id:0,
  }),

  mounted() {
    let user_id = this.$store.getters["auth/getUserId"]
    this.$nextTick(async () => {
      await this.initializeGroup(user_id);
    });
  },

  methods:{
    selectGroup(value){
      this.selected_group = 'created';
      this.group_id = value;
    },
    ...mapActions([
        'initializeGroup'
    ]),
  }
};
</script>
<style >
/*@import url("https://fonts.googleapis.com/css?family=Open+Sans");*/

/*html {*/
/*  font-family: "Open Sans", sans-serif;*/
/*  background: linear-gradient(45deg, #5189c1 25%, #41b883);*/
/*  height: 100%;*/
/*  color: #333;*/
/*}*/

/*body {*/
/*  display: flex;*/
/*  height: 100%;*/
/*  margin: 0;*/
/*}*/

/*.container {*/
/*  width: 50rem;*/
/*  margin: auto;*/
/*  background-color: white;*/
/*  border-radius: 1rem;*/
/*  padding: 1rem;*/
/*  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);*/
/*}*/

/*h1 {*/
/*  text-align: center;*/
/*  margin-top: 0;*/
/*}*/

</style>