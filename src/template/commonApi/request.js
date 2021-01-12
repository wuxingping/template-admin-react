//if (!isAuth()) return
//对需要 token 的请求，请求前本地先进行判断
//如果本地没有 token 的，直接return，不在就行请求

import { message } from "antd";
import axios from "axios";
import NProgress from "nprogress"; //引入nprogress进度条
import { HashRouter } from "react-router-dom";

import {
  getToken,
  removeToken,
  removeUserName,
  removeUserAuthority,
} from "../../utils/session";

import { BASE_URL, BASE_URL_HOSPITAL } from "../../utils/urlPrefix";

import "nprogress/nprogress.css"; //这个样式必须引入

const router = new HashRouter();
// 创建axios实例，添加基路径
let request = axios.create({
  baseURL: BASE_URL,
});

let num = 0;

// 添加请求拦截器
request.interceptors.request.use((config) => {
  if (num === 0) {
    NProgress.start();
  }
  ++num;
  //解构处请求地址
  const { url, serverPrefix } = config;
  //开发阶段token
  //请求头添加token
  if (!url.startsWith("/login")) {
    config.headers.Token = getToken();
  }
  //针对医院baseURL不同进行判断
  if (serverPrefix === "Python") {
    config.baseURL = BASE_URL_HOSPITAL;
  }
  //将处理后的 config 返回
  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 600 || res.data.code === "600") {
      message.error("登录过期，重新登录");
      removeToken();
      removeUserName();
      removeUserAuthority();
      router.history.push("login");
    } else if (res.data.code === 403 || res.data.code === "403") {
      message.error("没有权限");
    } else if (res.data.code === 200 || res.data.code === "0") {
    } else {
      message.error(res.data.msg || "请求数据失败，未知原因，请联系后端人员");
    }
    --num;
    if (num <= 0) {
      NProgress.done();
    }
    return res.data;
  },
  (error) => {
    --num;
    if (num <= 0) {
      NProgress.done();
    }
    message.error("请检查服务器或网络");
    return Promise.reject(error);
  }
);

export { request };
