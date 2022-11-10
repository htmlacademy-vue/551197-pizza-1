import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import { middlewarePipeline } from "@/middlewares";

import { auth, isLoggedIn } from "@/middlewares";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      layout: "AppLayoutEmpty",
      middlewares: [isLoggedIn],
    },
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
    meta: { layout: "AppLayoutHeader", middlewares: [auth] },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;

  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;

  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});
export default router;
