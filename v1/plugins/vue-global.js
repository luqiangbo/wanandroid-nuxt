import Vue from 'vue'
import util from '~/util'
import install from '~/components/common/install.js' // 全局组件

Vue.prototype.$util = util

Vue.use(install)
