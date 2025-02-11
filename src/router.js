import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/LoginPage.vue";
import About from "./pages/AboutPage.vue";
import { nextTick } from "vue";
import { useAuthStore } from "./store/authStore";
import MainLayout from "./layouts/MainLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import NotFound from "./layouts/NotFound.vue";
import LoginPageV2 from "./pages/LoginPageV2.vue";
import Home from "./pages/HomePage.vue";
const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/about",
        component: About,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: LoginPage,
      },
    ],
  },
  {
    path: "/loginv2",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: LoginPageV2,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/" && !authStore.isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && authStore.isLoggedIn) {
    next("/");
  } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    localStorage.setItem("redirectUrl", to.path);
    next("/login");
  } else {
    next();
  }
});

export default router;
