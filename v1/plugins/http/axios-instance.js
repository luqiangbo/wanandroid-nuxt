import Cookies from 'js-cookie'
const name = Cookies.get('loginUserName')
export default ({ $axios, redirect }) => {
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post',
  ])
  $axios.setHeader('xxx', name)
  $axios.setToken('instance123', 'Bearer', ['post', 'delete'])
  $axios.onRequest((config) => {
    console.log('接口onRequest' + config.url)
  })
  $axios.onResponse((response) => {
    console.log('接口onRequest' + response)
  })
  $axios.onError((error) => {
    console.log('接口onError', error)
    if (error.response.status === 500) {
      redirect('/error')
    }
  })
  $axios.onRequestError((error) => {
    console.log('接口onRequestError', error)
  })
  $axios.onResponseError((error) => {
    console.log('接口onResponseError', error)
  })
}
