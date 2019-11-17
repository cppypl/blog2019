import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default [
    
    {
        path:"list",
        name:"list",
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/list.vue'),
    },
   
    {
        path:"my",
        name:"my",
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/my.vue'),
    },
    {
        path:"addBlog",
        name:"addBlog",
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/addBlog.vue'),
    },
    {
        path:"type",
        name:"type",
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/typeList.vue'),
    },
    {
        path:"addType",
        name:"addType",
        component:()=> import(/* webpackChunkName: "admin" */ '../../views/admin/addType.vue'),
    }
];
