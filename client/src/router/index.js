import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login/index'
import NoPage from '@/view/404/404'
import store from '../store/index'
import { Message } from 'element-ui'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      name: 'NoPage',
      component: NoPage
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: (to, from, next) => {
        let token =
          store.state.userMsg.token ||
          JSON.parse(window.localStorage.getItem('userMsg'))
            ? JSON.parse(window.localStorage.getItem('userMsg')).token
            : ''
        if (token) {
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
