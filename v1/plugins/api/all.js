import createWan from '~/api/wanandroid'
export default (ctx, inject) => {
  inject('axiosWan', createWan(ctx.$axios)(''))
}
