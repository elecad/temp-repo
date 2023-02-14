import { RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
  },

  {
    path: "/g/:id",
    component: MainLayout,
  },

  {
    path: "/t/:id",
    component: MainLayout,
  },
  {
    path: "/l/:id",
    component: MainLayout,
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
