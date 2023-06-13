import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login.vue";
import signup from "../views/auth/Signup.vue";
import logout from "../views/auth/logout.vue";
import dashboard from "../views/dashboard.vue";
import verification from "../views/auth/verification.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
    },
    {
      path: "/auth/signup",
      name: "signup",
      component: signup,
    },
    {
      path: "/auth/verification",
      name: "verification",
      component: verification,
    },
    {
      path: "/auth/logout",
      name: "logout",
      component: logout,
    },
  ],
});

export default router;
