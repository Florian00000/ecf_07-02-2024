import { createRouter, createWebHistory } from "vue-router";
import loginView from '../views/loginView.vue';

const router = createRouter({
    history : createWebHistory(),
    routes: [
        {path: '/', component: loginView},
    ]
});

export default router;