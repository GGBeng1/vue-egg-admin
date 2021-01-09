import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { Loading, Message } from 'element-ui'

// import qs from 'qs'
axios.defaults.timeout = 0
axios.defaults.withCredentials = true
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
} else {
  // axios.defaults.baseURL = "http://10.1.58.71:7001";
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
}

// 取消重复请求
const pending = [] // 声明一个数组用于存储每个请求的取消函数和axios标识
const cancelToken = axios.CancelToken
const removePending = config => {
  // console.log("pending", pending);
  // eslint-disable-next-line no-unused-vars
  for (const p in pending) {
    if (pending[p].u === config.url.split('?')[0] + '&' + config.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 数组移除当前请求
    }
  }
}

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(
  config => {
    removePending(config) // 在一个axios发送前执行一下取消操作
    // eslint-disable-next-line new-cap
    config.cancelToken = new cancelToken(c => {
      // pending存放每一次请求的标识，一般是url + 参数名 + 请求方法，当然你可以自己定义
      pending.push({ u: config.url.split('?')[0] + '&' + config.method, f: c }) // config.data为请求参数
    })
    Loading.service({
      fullscreen: true,
      lock: true,
      text: '拼命加载中...'
    })
    const token =
      store.state.userMsg.token ||
      JSON.parse(window.localStorage.getItem('token'))
        ? JSON.parse(window.localStorage.getItem('token'))
        : '' || ''
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    const loading = Loading.service({})
    loading.close()
    return Promise.reject(error)
  }
)

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(
  response => {
    const loading = Loading.service({})
    loading.close()
    return response
  },
  error => {
    const loading = Loading.service({})
    loading.close()
    if (error.response) {
      if (error.response.status === 401) {
        // 这种情况一般调到登录页
        window.localStorage.clear()
        store.commit('clearUserMsg')
        router.replace({
          path: '/'
        })
        Message({
          message: 'token已失效，请重新登录',
          type: 'error',
          showClose: true
        })
      } else if (
        error.response.status === 404 ||
        error.response.status === 500
      ) {
        Message({
          message: '请求失败',
          type: 'error',
          showClose: true
        })
      }
    }
    return Promise.resolve(error)
  }
)

export default axios
