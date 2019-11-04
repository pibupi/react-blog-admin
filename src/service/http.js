import axios from 'axios'
import { message } from 'antd'
import {localGettoken} from '../utils/storage'
// 进度条待开发
// import NProgress from 'nprogress'

const $http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://rap2api.taobao.org/app/mock/234823' : '', // api的base_url
  timeout: 20000 // 请求超时时间
})

let timer

//拦截请求
$http.interceptors.request.use(
  config => {
    const token = localGettoken('authToken')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    message.error('bed request')
    Promise.reject(error)
  }
)
//拦截响应
$http.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      response.data.message && message.warning(response.data.message)
      console.log(response.data)
      return Promise.reject(response.data)
    }
    return response.data
  },
  err => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            message.error('错误请求')
            break
          case 401:
            localStorage.clear()
            message.error('登录信息过期或未授权，请重新登录！')
            break
          case 403:
            message.error('拒绝访问！')
            break
          case 404:
            message.error('请求错误,未找到该资源！')
            break
          case 500:
            message.err('服务器出问题了，请稍后再试！')
            break
          default:
            message.err(`连接错误 ${err.response.status}！`)
            break
        }
      } else {
        message.error('服务器出了点小问题，请稍后再试！')
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

export {
  $http,
}
