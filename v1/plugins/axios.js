import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import Api from '~/api/index'
const name = Cookies.get('loginUserName')

// 重定向
// redirect({
//   path: '/400',
//   query: {
//     isExpires: 1,
//   },
// })
export default function ({ $axios, redirect }, inject) {
  const api = $axios.create({
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
      // console.log(error)
      return Promise.reject(error)
    }
  )
  // 出参
  api.interceptors.response.use(
    (response) => {
      const res = response.data
      // console.log(response, res)
      if (res.code) {
        Message({
          message: res,
          type: 'error',
          duration: 5 * 1000,
        })
        // if (todo) {
        //   console.log('重新登录')
        // }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        console.log(res)
        return res
      }
    },
    (error) => {
      // console.log('err' + error)
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  )
  for (const key in Api) {
    const v = Api[key]
    inject(`api_${key}`, v(api)('/api'))
  }
}
