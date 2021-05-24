<template>
  <div class="col-md-12">
    <v-container>
      <v-form name="form" @submit="handleLogin">
        <div class="form-group">
<!--          <label for="username">Username</label>-->
          <v-text-field
              v-model="user.username"
              v-validate="'required'"
              type="text"
              label="Username"
              name="username"
              id="username"
          />
          <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
          >Username is required!</div>
        </div>
        <div class="form-group">
<!--          <label for="password">Password</label>-->
          <v-text-field
              v-model="user.password"
              v-validate="'required'"
              type="password"
              label="Password"
              name="password"
              id="password"
          />
          <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
          >Password is required!</div>
        </div>
<!--        <div class="form-group">-->
<!--          <button class="btn btn-primary btn-block" :disabled="loading">-->
<!--            <span v-show="loading" class="spinner-border spinner-border-sm"></span>-->
<!--            <span>Login</span>-->
<!--          </button>-->
<!--        </div>-->
        <v-btn
            class="ma-2"
            :disabled="loading"
            :loading="loading"
            @click="handleLogin">
          Login
        </v-btn>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import User from '@/models/user'
export default {
  name: "LoginPage",
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/main');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$router.push('/main');
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    }
  }
}
</script>

<style scoped>

</style>