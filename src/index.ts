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
import HeaderSearch from '../packages/headersearch'
import XlTreeSelect from '../packages/vue-treeselect'

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
  HeaderSearch,
  XlTreeSelect
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install: any = function (Vue: any, opts = {}): void {
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
  HeaderSearch,
  XlTreeSelect
}
