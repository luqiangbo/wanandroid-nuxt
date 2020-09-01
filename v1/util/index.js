export const to = (promise) => {
  return promise
    .then((data) => {
      return [null, data]
    })
    .catch((err) => [err, null])
}
// 柯里化
export const currying = (func, args = []) => {
  const arity = func.length
  return function (..._args) {
    _args.unshift(...args)
    if (_args.length < arity) {
      return this.currying.call(null, func, _args)
    }
    return func(..._args)
  }
}
// 获取窗口可视范围的高度
export const getViewHeight = () => {
  return document.documentElement.clientHeight
}
// 获取滚动条距离顶部的距离
export const getScrollTop = () => {
  return parseInt(document.documentElement.scrollTop)
}
// 获取文档内容实际高度
export const getContentHeight = () => {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
