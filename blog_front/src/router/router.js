import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import admin from "./admin/index";
import notFound from "../components/notFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path:"/login",
        name:"login",
        component:()=> import(/* webpackChunkName: "admin" */ '../views/login.vue'),
    },
    {
      path: "/admin",
      
      name: "admin",
      component: () => import(/* webpackChunkName: "admin" */ "../views/admin/header.vue"),
      redirect:{
          path:"/admin/list"
      },
      children: [...admin]
    },
    {
      path: "*",
      component: notFound
    }
  ]
});
