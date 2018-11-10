import Vue from 'vue'
import Router from 'vue-router'
import Manager from '@/components/Manager'
import User from '@/components/User'
import Call from '@/components/Call'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/call/:roomId',
      name: 'Call',
      component: Call
    },
  ],
  mode:'history'
})
