import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.timeout = 600000 // 十分钟超时
axios.defaults.baseURL = process.env.VUE_APP_API_URL // 环境变量 baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

/* ------------------------------- 无情分割线 ------------------------------- */

function get (url = '', request = {}, config = {}) {
  return axios.get(url, { params: request }, config).then(response => {
    return response.data
  }).catch(error => {
    console.error('get请求出错！', error)
    Message.error('请求出错')
  })
}

function post (url = '', request = {}, config = {}) {
  return axios.post(url, request, config).then(response => {
    return response.data
  }).catch(error => {
    console.error('post请求出错！', error)
    Message.error('请求出错')
  })
}

function put (url = '', request = {}, config = {}) {
  return axios.put(url, request, config).then(response => {
    return response.data
  }).catch(error => {
    console.error('put请求出错！', error)
    Message.error('请求出错')
  })
}

function del (url = '', request = {}, config = {}) {
  return axios.delete(url, { params: request }, config).then(response => {
    return response.data
  }).catch(error => {
    console.error('del请求出错！', error)
    Message.error('请求出错')
  })
}

export default { get, post, put, del }
