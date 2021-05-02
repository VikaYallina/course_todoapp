import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify';
import store from "./store/store";
import { router } from './router/router';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false
Vue.use(VeeValidate);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   store,
//   vuetify,
//   template: '<App/>',
//   components: { App },
//   methods:{
//     checkLogin(){
//       if(!localStorage.getItem('login')){
//         this.$router.push('/login');
//       }else{
//         this.$router.push('/user');
//       }
//     }
//   }
// })
