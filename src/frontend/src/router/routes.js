import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: { layout: "AppLayoutEmpty" },
  },
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index"),
    meta: { layout: "AppLayoutHeader" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../modules/cart/Cart.vue"),
    meta: { layout: "AppLayoutHeader" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: { layout: "AppLayoutSidebar" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: { layout: "AppLayoutSidebar" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
