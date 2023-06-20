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
      meta: {
        requiresAuth: true,
      }
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
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/auth/logout",
      name: "logout",
      component: logout,
    },
  ],
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
