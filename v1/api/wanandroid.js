import qs from 'qs'
const to = (promise) => {
  return promise
    .then((data) => {
      return [null, data]
    })
    .catch((err) => [err, null])
}
export default ($axios) => (resource) => ({
  // 首页文章列表
  getArticle(int) {
    return to($axios.$get(`${resource}/article/list/${int}/json`))
  },
  // 首页banner
  getBanner() {
    return to($axios.$get(`${resource}/banner/json`))
  },
  getAllIndex(int) {
    return to(
      Promise.all([
        $axios.$get(`${resource}/article/list/${int}/json`),
        $axios.$get(`${resource}/banner/json`),
      ])
    )
  },
  // 登录
  postLogin(payload) {
    return to($axios.$post(`${resource}/user/login`, qs.stringify(payload)))
  },
  // 注册
  postRegister(payload) {
    return to($axios.$post(`${resource}/user/register`, qs.stringify(payload)))
  },
  // 退出
  getLogout() {
    return to($axios.$post(`${resource}/user/logout/json`))
  },
})
