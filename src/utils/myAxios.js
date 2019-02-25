import Vue from 'vue'

// 在Vue的原型上挂在一个$axios
import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/" //基准路径
Vue.prototype.$axios = axios
/**
 * 请求拦截器，可以在请求真正发送出去之前，做一些额外的事情，比如添加一些我们
 * 需要的请求头
 */
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.getItem('mytoken')){
    config.headers.Authorization = localStorage.getItem('mytoken')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return response.data
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})