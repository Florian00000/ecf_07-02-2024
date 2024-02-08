import { createRouter, createWebHistory } from "vue-router";
import LoginView from '../views/loginView.vue';
import HomeView from '../views/homeView.vue';
import SignupView from '../views/signupView.vue';

const router = createRouter({
    history : createWebHistory(),
    routes: [
        {path: '/', component: LoginView},
        {path: '/user', component: HomeView},
        {path: '/signup', component: SignupView}
    ]
});

router.beforeEach((to, from) => {
    if (localStorage.getItem("jwt")) {
        return true;
    } else if (to.fullPath.startsWith('/user'))return '/'
    return true;
})

export default router;