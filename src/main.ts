import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import cookies from '@/utils/cookies'
import dayjs from '@/utils/dayjs'
import _ from '@/utils/lodash'
import directive from '@/directive'
import '@/assets/main.scss'
import '@/assets/tailwind.css'

// main.ts 文件
import sxlUi2 from './index'
Vue.use(directive)
Vue.use(sxlUi2, {
  size: 'small',
  storage: {
    prefix: 'dev-', //存储前缀
    expire: '1h', //过期时间，默认为一天
    isEncrypt: true, //支持加密、解密数据处理
    SECRET_KEY: 'ccdde6e143439161', //加密的KEY,十六位十六进制数作为密钥
    SECRET_IV: 'aabbe7e3ba84431a' //加密的IV,十六位十六进制数作为密钥偏移量
  }
})

Vue.config.productionTip = false
Vue.prototype.$cookies = cookies
Vue.prototype._ = _

Vue.use(ElementUI, { size: 'medium', zIndex: 100 })
Vue.use(dayjs)
//Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 100 }

new Vue({
  render: h => h(App)
}).$mount('#app')
