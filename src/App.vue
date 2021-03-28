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
      <div id="app">
        <v-app id="inspire">
          <v-app id="inspire">
            <v-navigation-drawer
                v-model="drawer"
                app
            >
              <v-list dense>
                <v-list-item link>
                  <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Contact</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>

            <v-app-bar
                app
                color="indigo"
                dark
            >
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <v-toolbar-title>Application</v-toolbar-title>
            </v-app-bar>

            <v-main>
              <v-container
                  class="fill-height"
                  fluid
              >
                <v-row align="center" justify="center">
                  <NewTodo />
                </v-row>
                <v-row align="center" justify="center">
                  <TodoList />
                </v-row>
              </v-container>
            </v-main>
            <v-footer
                color="indigo"
                app
            >
              <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
            </v-footer
            >
          </v-app>
        </v-app>
      </div>

<!--      </v-app>-->
  </div>

</template>

<script>
import NewTodo from "@/components/TodoItems/NewTodo";
import TodoList from "@/components/TodoItems/TodoList";
export default {
  name: 'App',

  components: {
    TodoList,
    NewTodo
  },

  data: () => ({
    drawer: false
  }),
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