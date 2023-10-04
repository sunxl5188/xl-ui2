import axios, {
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios'

import { MessageBox, Message } from 'element-ui'
import cookies from './cookies'

const createAxios: CreateAxiosDefaults = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 5000,
  withCredentials: false, // 表明跨域请求是否需要证明
  responseType: 'json', // 'arraybuffer','blob','document','json','text',stream'
  responseEncoding: 'utf8'
}
const request = axios.create(createAxios)

interface pendingType {
  url?: string
  method?: string
  params: any
  data: any
  cancel: any
}
const pending: Array<pendingType> = []
const CancelToken = axios.CancelToken
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    if (Object.prototype.hasOwnProperty.call(pending, key)) {
      const item: number = +key
      const list: pendingType = pending[key]
      // 当前请求在数组中存在时执行函数体
      if (
        list.url === config.url &&
        list.method === config.method &&
        JSON.stringify(list.params) === JSON.stringify(config.params) &&
        JSON.stringify(list.data) === JSON.stringify(config.data)
      ) {
        // 执行取消操作
        list.cancel('frequently')
        // 从数组中移除记录
        pending.splice(item, 1)
      }
    }
  }
}

// request 不支持泛型
// request.get post put 支持响应数据泛型
// 由于我们的后端又包装了一层数据data ，导致访问数据比较麻烦，所以又封装一层
// 控制登录过期的锁
let isRefreshing = false
// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    removePending(config)
    config.cancelToken = new CancelToken(c => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (cookies.get('Admin-Token') && !isToken) {
      config.headers['Authorization'] = cookies.get('Admin-Token')
      // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.data.status

    if (!status || status === 200) {
      return response.data
    }
    if (status === 401) {
      // 防止多次弹出登录框
      if (isRefreshing) return Promise.reject(response)
      // 清除本地过去的登录状态
      MessageBox.confirm('登录状态已过期，请重新登录', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 跳转到登录页
        })
        .catch(() => {
          // 抛出异常
        })
        .finally(() => {
          isRefreshing = false
        })
      // 在内部消化掉这个业务异常
      return Promise.reject(response)
    }

    // 其他错误情况
    Message.error(response.data.msg || '请求失败，请稍后重试')
    return Promise.reject(response.data)
  },
  error => {
    console.log('err' + error)
    let messages = ''
    const { message, response } = error
    const msg = response && response.data ? response.data.msg : response

    if (message == 'Network Error') {
      messages = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      messages = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      messages = '系统接口' + message.substr(message.length - 3) + '异常'
    } else if (message.includes('frequently')) {
      messages = '操作太频繁，请稍后再试'
    }
    Message({ message: msg || messages, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// 通过导出自定的request实例，来实现对axios的类型封装
export default (config: AxiosRequestConfig) => {
  return request(config).then(response => {
    return response
  })
}
