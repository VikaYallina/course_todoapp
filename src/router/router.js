import Vue from "vue";
import Router from 'vue-router'
import LoginPage from "@/views/LoginPage";
import App from "@/App";
import RegisterPage from "@/views/RegisterPage";

Vue.use(Router)

export const router =  new Router({
    mode: 'history',
    routes:[
        {
            path:'/',
            name:"welcome",
            component: App
        },
        {
          path:'/home',
          // component: LoginPage
        },
        {
            path:'/login',
            component: LoginPage
        },
        {
            path:'/register',
            component: RegisterPage
        },
        {
            path:'/main',
            component: () => import('@/views/MainView.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/main'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});