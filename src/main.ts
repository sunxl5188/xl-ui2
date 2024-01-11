import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import cookies from '@/utils/cookies'
import dayjs from '@/utils/dayjs'
import _ from '@/utils/lodash'
import directive from '@/directive'
import '@/assets/main.scss'

// main.ts 文件
import sxlUi from './index'
Vue.use(directive)
Vue.use(sxlUi, { size: 'small' })

Vue.config.productionTip = false
Vue.prototype.$cookies = cookies
Vue.prototype._ = _

Vue.use(ElementUI, { size: 'medium', zIndex: 100 })
Vue.use(dayjs)
//Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 100 }

new Vue({
  render: h => h(App)
}).$mount('#app')
