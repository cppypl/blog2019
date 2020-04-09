import Vue from "vue";
import Router from "vue-router";
import home from "../views/home.vue";
import admin from "./admin/index";
import notFound from "../components/notFound";

Vue.use(Router);

let router=new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component:  ()=> import(/* webpackChunkName: "front" */ '../views/frontLayout.vue'),
      children:[
        {
          path: "/",
          name: "home",
          component: ()=> import(/* webpackChunkName: "front" */ '../views/home.vue'),
        },
        {
          path: "/detail",
          name: "detail",
          component: ()=> import(/* webpackChunkName: "front" */ '../views/detail.vue'),
        },
        {
          path: "/about",
          name: "about",
          component: ()=> import(/* webpackChunkName: "front" */ '../views/about.vue'),
        },
      ],
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


router.beforeEach((to, from,next)=>{
  if(to.meta.requireAuth){
    let token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
       })
    }
  }else{
    next()
  }
})

export default router