import axios from "./axios";
import resfulParamsToUrl from "./resfulParamsToUrl";
//登录
export const login = params => {
  return axios.post(resfulParamsToUrl("/login", params), params);
};
export const getHomeList = params => {
  return axios.post(resfulParamsToUrl("/api/home", params), params);
};
export const updateUserNickname = params => {
  return axios.post(
    resfulParamsToUrl("/api/updateUserNickname", params),
    params
  );
};
export const tableExport = params => {
  return axios.post(resfulParamsToUrl("/api/tableExport", params), params, {
    responseType: "blob"
  });
};
export const tableUpload = axios.defaults.baseURL + "/public/excel/792666.xlsx";
export const getVerify = params => {
  return axios.get(resfulParamsToUrl("/verify", params), {
    params
  });
};
