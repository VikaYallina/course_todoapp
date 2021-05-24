<template>
<div class="container">
  <div class="col-md-12">
      <v-form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <v-text-field
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
                id="username"
                label="Username"
            />
            <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <v-text-field
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="form-control"
                name="email"
                id="email"
                label="Email"
            />
            <div
                v-if="submitted && errors.has('email')"
                class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <v-text-field
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                id="password"
                name="password"
                label="Password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <v-btn
              class="ma-2"
              @click="handleRegister">
            Login
          </v-btn>
        </div>
      </v-form>

      <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
</div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "RegisterPage",
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/main');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
              },
              error => {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
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