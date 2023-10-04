import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import cookies from '@/utils/cookies'
import dayjs from '@/utils/dayjs'
import directive from '@/directive'
// main.ts 文件
import sxlUi from './index'

Vue.use(directive)
Vue.use(sxlUi)

Vue.config.productionTip = false
Vue.prototype.$cookies = cookies

Vue.use(ElementUI)
Vue.use(dayjs)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
