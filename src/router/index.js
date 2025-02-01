import { createWebHistory, createRouter } from "vue-router";
import { HomePage, AboutPage, ErrorPage } from "../pages";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: AboutPage,    
  },
  {
    path: "/:catchAll(.*)",
    component: ErrorPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;