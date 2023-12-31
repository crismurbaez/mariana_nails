import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import CarritoView from '../views/CarritoView.vue'
import ContactView from '../views/ContactView.vue'
import CrudServiciosView from '../views/CrudServiciosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: ServiciosView
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CarritoView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/admin',
    name: 'administrador',
    component: CrudServiciosView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
