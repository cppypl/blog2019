import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default [
    
    {
        path:"list",
        name:"list",
        meta:{
            requireAuth:true
          },
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/list.vue'),
    },
   
    {
        path:"my",
        name:"my",
        meta:{
            requireAuth:true
          },
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/my.vue'),
    },
    {
        path:"addBlog",
        name:"addBlog",
        meta:{
            requireAuth:true
          },
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/addBlog.vue'),
    },
    {
        path:"type",
        name:"type",
        meta:{
            requireAuth:true
          },
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/typeList.vue'),
    },
    {
        path:"addType",
        name:"addType",
        meta:{
            requireAuth:true
          },
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/addType.vue'),
    }
];
