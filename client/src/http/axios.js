import axios from 'axios'
import store from '../store/index'
import { Loading } from 'element-ui'

// import qs from 'qs'
axios.defaults.timeout = 0
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = 'http://localhost:7001'
}
/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(
  config => {
    Loading.service({
      fullscreen: true,
      lock: true,
      text: '拼命加载中...'
    })
    let token = store.state.userMsg.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
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
    return Promise.resolve(error)
  }
)

export default axios
