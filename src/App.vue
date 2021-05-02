<template>
  <div class="container">
    <div id="app">
      <v-app id="inspire">
        <v-main>
      <v-app-bar
          app
          color="indigo"
          dark
      >
        <v-toolbar-title>TodoNow</v-toolbar-title>
        <v-spacer></v-spacer>

<!--          <v-btn>-->
<!--            <router-link to="/home">-->
<!--              Home-->
<!--            </router-link>-->
<!--          </v-btn>-->
<!--          <div v-if="!currentUser">-->
<!--            <v-btn>-->
<!--              <router-link to="/register" class="nav-link">-->
<!--                Sign Up-->
<!--              </router-link>-->
<!--            </v-btn>-->
<!--            <v-btn>-->
<!--              <router-link to="/login" class="nav-link">-->
<!--                Login-->
<!--              </router-link>-->
<!--            </v-btn>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <v-btn>-->
<!--              <router-link to="/main">Todo main page</router-link>-->
<!--            </v-btn>-->
<!--            <v-btn>-->
<!--              <a class="nav-link" href @click.prevent="logOut">LogOut</a>-->
<!--            </v-btn>-->
<!--          </div>-->
<!--          <v-tabs right>-->

              <v-tabs right v-if="!currentUser">
                <v-tab to="/home">Home</v-tab>
                <v-tab to="/register">Sign up</v-tab>
                <v-tab to="/login">Login</v-tab>
              </v-tabs>
              <v-tabs right v-else>
                <v-tab to="/home">Home</v-tab>
                <v-tab to="/main">Todo main page</v-tab>
                <v-tab @click.prevent="logOut">Log out</v-tab>
              </v-tabs>

<!--          </v-tabs>-->
      </v-app-bar>

        <v-container>
          <router-view />
        </v-container>
      </v-main>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>