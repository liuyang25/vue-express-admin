import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../views/admin.vue'
import Login from '../pages/login.vue'
import Users from '../pages/user/user-list.vue'
import Orders from '../pages/order/order-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      redirect: '/admin/orderlist',
      component: Admin,
      children: [
        {
          path: '/admin/orderlist',
          component: Orders
        },
        {
          path: '/admin/user',
          component: Users
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
