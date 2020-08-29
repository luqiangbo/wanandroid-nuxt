import { Message } from 'element-ui'
import Cookies from 'js-cookie'
const name = Cookies.get('loginUserName')
export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
    timeout: 5000,
  })
  // 入参
  api.interceptors.request.use(
    (config) => {
      if (name) {
        config.headers['X-Token'] = name
      }
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  // 出参
  api.interceptors.response.use(
    (response) => {
      const res = response.data
      console.log(res.code)
      if (res.code) {
        Message({
          message: res,
          type: 'error',
          duration: 5 * 1000,
        })
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          console.log('重新登录')
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    (error) => {
      console.log('err' + error)
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  )
  inject('api', api)
}
