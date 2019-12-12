import axios from "axios";
import store from "../store/index";
import router from "../router/index";
import { Loading, Message } from "element-ui";

// import qs from 'qs'
axios.defaults.timeout = 0;
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:7001";
} else {
  // axios.defaults.baseURL = "http://10.1.58.71:7001";
  axios.defaults.baseURL = "http://localhost:7001";
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
      text: "拼命加载中..."
    });
    let token =
      store.state.userMsg.token ||
      JSON.parse(window.localStorage.getItem("token"))
        ? JSON.parse(window.localStorage.getItem("token"))
        : "" || "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    const loading = Loading.service({});
    loading.close();
    return Promise.reject(error);
  }
);

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(
  response => {
    const loading = Loading.service({});
    loading.close();
    return response;
  },
  error => {
    const loading = Loading.service({});
    loading.close();
    if (error.response) {
      if (error.response.status === 401) {
        // 这种情况一般调到登录页
        window.localStorage.clear();
        store.commit("clearUserMsg");
        router.replace({
          path: "/"
        });
        Message({
          message: "token已失效，请重新登录",
          type: "error",
          showClose: true
        });
      } else if (
        error.response.status === 404 ||
        error.response.status === 500
      ) {
        Message({
          message: "请求失败",
          type: "error",
          showClose: true
        });
      }
    }
    return Promise.resolve(error);
  }
);

export default axios;
