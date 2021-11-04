import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/user/Home.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: { layout: "main" },
    component: Home
  },
  {
    path: "/statistics",
    name: "StatisticsUser",
    meta: { layout: "main" },
    component: () => import("../views/user/StatisticsUser")
  },
  {
    path: "/",
    name: "LogIn",
    meta: { layout: "start" },
    component: () => import("../views/auth/LogIn")
  },
  {
    path: "/signup",
    name: "SignUp",
    meta: { layout: "start" },
    component: () => import("../views/auth/SignUp")
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { layout: "main" },
    component: () => import("../views/admin/Settings")
  },
  {
    path: "/statistics_admin",
    name: "StatisticsAdmin",
    meta: { layout: "main" },
    component: () => import("../views/admin/StatisticsAdmin")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
