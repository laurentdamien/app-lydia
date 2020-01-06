import Vue from "vue";
import VueRouter from "vue-router";
import Transactions from "@/views/Transactions.vue";
import Transaction from "@/views/Transaction.vue";
import Users from "@/views/Users.vue";
import User from "@/views/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    redirect: "/transactions"
  },
  {
    name: "transactions",
    path: "/transactions",
    component: Transactions
  },
  {
    name: "transaction",
    path: "/transactions/:id",
    component: Transaction
  },
  {
    name: "users",
    path: "/users",
    component: Users
  },
  {
    name: "user",
    path: "/users/:id",
    component: User
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
