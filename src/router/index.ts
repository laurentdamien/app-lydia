import Vue from "vue";
import VueRouter from "vue-router";
import Users from "@/views/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "users",
    path: "/",
    component: Users
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
