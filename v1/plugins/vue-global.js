import Vue from 'vue'
import * as util from '~/util'
import components from '~/components/common/index.js' // 全局组件

Vue.prototype.$util = util

Vue.use(components)
