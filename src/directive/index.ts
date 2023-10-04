/**
 * 引入指令
 */
import focus from './focus'
import code from './code'

const install = function (Vue: any) {
  Vue.directive('focus', focus)
  Vue.directive('code', code)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install
}
