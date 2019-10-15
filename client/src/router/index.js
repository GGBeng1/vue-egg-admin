import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/index'
import store from '../store/index'
import { Message } from 'element-ui'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: (to, from, next) => {
        if (store.state.userMsg && store.state.userMsg.token) {
          next()
        } else {
          next('/')
          Message({
            message: '请登录后访问',
            type: 'warning',
            showClose: true
          })
        }
      },
      component: () =>
        import(/* webpackChunkName: "home" */ '@/view/homePage/index')
    }
  ]
})
