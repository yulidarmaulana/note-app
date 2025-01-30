import { createWebHistory, createRouter } from "vue-router";
import { HomeView, AboutView, ErrorView } from "../views";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/about",
    component: AboutView,    
  },
  {
    path: "/:catchAll(.*)",
    component: ErrorView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;