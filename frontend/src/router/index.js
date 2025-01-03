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
import Search from "@/components/Client/search/Search.vue";
import Recruitment from "@/views/Recruitment.vue";
import Payment from "../views/Payment.vue";
import Apply from "../views/Apply.vue";
import Story from "@/components/Client/Story/Story.vue";
const router = createRouter({
  history: createWebHistory(),
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
    {
      path: "/search",
      name: "Search",
      component: Search,
    },
    {
      path: "/recruitment",
      name: "recruitment",
      component: Recruitment,
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment,
    },
    {
      path: "/apply",
      name: "apply",
      component: Apply,
    },
    {
      path: "/apply",
      name: "apply",
      component: Apply,
    },
    {
      path: "/story",
      name: "story",
      component: Story,
    },
  ],
});

export default router;
