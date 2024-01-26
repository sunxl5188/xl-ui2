import XlTable from '../packages/table'
import XlPagination from '../packages/pagination'
import virtualSelect from '../packages/virtual-select'
import XlSelect from '../packages/select'
import XlCheckBox from '../packages/checkobx'
import SpeakTts from '../packages/speak-tts'
import XlForm from '../packages/form'
import XlRadio from '../packages/radio'
import XlCascader from '../packages/cascader'
import XlDatePicker from '../packages/datepicker'
import XlHeaderSearch from '../packages/headersearch'
import XlTreeSelect from '../packages/vue-treeselect'
import XlDateTime from '../packages/datetime'

import cache from './utils/cache'

// 存储组件列表
const components = [
  XlTable,
  XlPagination,
  virtualSelect,
  XlSelect,
  XlCheckBox,
  SpeakTts,
  XlForm,
  XlRadio,
  XlCascader,
  XlDatePicker,
  XlHeaderSearch,
  XlTreeSelect,
  XlDateTime
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install: any = function (Vue: any, opts: any = {}): void {
  Vue.prototype.$global = {
    ...{
      codeApi: '/index/system/index/code/'
    },
    ...opts
  }
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.forEach((component: any) => {
    console.log(component.name)
    Vue.component(component.name, component)
  })
  Vue.use(cache, {
    ...{
      prefix: 'sxl-', //存储前缀
      expire: '1d', //过期时间，默认为一天
      isEncrypt: true, //支持加密、解密数据处理
      SECRET_KEY: 'ccdde6e143439161', //加密的KEY,十六位十六进制数作为密钥
      SECRET_IV: 'aabbe7e3ba84431a' //加密的IV,十六位十六进制数作为密钥偏移量
    },
    ...opts.storage
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
  // 以下是单个导出的组件
  XlTable,
  XlPagination,
  virtualSelect,
  XlSelect,
  XlCheckBox,
  SpeakTts,
  XlForm,
  XlRadio,
  XlCascader,
  XlDatePicker,
  XlHeaderSearch,
  XlTreeSelect,
  XlDateTime
}
