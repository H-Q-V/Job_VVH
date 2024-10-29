import { createRouter, createWebHistory } from "vue-router";
//layouts
import layoutAccuracy from "@/layouts/layoutAccuracy.vue";
//views
import Register from "@/components/Client/Accuracy/Register.vue";
import Login from "@/components/Client/Accuracy/Login.vue";
import Otp from "@/components/Client/Accuracy/Otp.vue";
import Main from "@/views/Main.vue";
import App from "@/App.vue";
import JdPage from "@/components/Client/jd-page/Jd-Page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/job/:id",
      name: "jd-page",
      component: JdPage,
      props: true
    },
    {
      path: "/accuracy",
      name: "accuracy",
      component: layoutAccuracy,
      children: [
        { path: "", name: "Login", component: Login },
        { path: "register", name: "Register", component: Register },
        { path: "otp", name: "Otp", component: Otp },
      ],
    },
   
  ],
});

export default router;
