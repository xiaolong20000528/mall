import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/home/home.vue"
const routes=[
  {
    path:"/",
    redirect:"/home"
  },{
    path:'/home',
    component:Home
  },{
    path:'/category',
    component:()=>import(/*webpackChunkName:"category"*/'@/views/category/category.vue')
  },
  {
    path:'/cart',
    component:()=>import(/*webpackChunkName:"cart"*/'@/views/cart/cart.vue')
  },
  {
    path:'/profile',
    component:()=>import(/*webpackChunkName:"profile"*/'@/views/profile/profile.vue')
  }
]

const router=createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
 
export default router
