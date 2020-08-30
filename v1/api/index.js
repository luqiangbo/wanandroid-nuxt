// api 自动化
const ctx = require.context('.', false, /.api.js$/)
const APIS = {}
ctx.keys().forEach((item) => {
  const name = item.split('.')[1].slice(1)
  const config = ctx(item)
  const dft = config.default || config
  APIS[name] = dft
})
export default APIS
