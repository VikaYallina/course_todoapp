import Vue from 'vue'
import App from './views/App.vue'
import vuetify from './plugins/vuetify';
import store from "./store/store";
import router from '/router'

Vue.config.productionTip = false

// new Vue({
//   vuetify,
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  template: '<App/>',
  components: { App },
  methods:{
    checkLogin(){
      if(!localStorage.getItem('login')){
        this.$router.push('/login');
      }else{
        this.$router.push('/user');
      }
    }
  }
})
