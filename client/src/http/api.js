import axios from './axios'
import resfulParamsToUrl from './resfulParamsToUrl'
//登录
export const login = params => {
  return axios.post(resfulParamsToUrl('/login', params), params)
}
export const getHomeList = params => {
  return axios.post(resfulParamsToUrl('/home', params), params)
}
// export const queryUser = params => {
//   return axios.get(resfulParamsToUrl(Path.userUrl1, params), {
//     params
//   })
// }
