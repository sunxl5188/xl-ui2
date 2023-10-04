import table from '../packages/table'
import pagination from '../packages/pagination'
import virtualSelect from '../packages/virtual-select'
import select from '../packages/select'
import speakTts from '../packages/speak-tts'

// 存储组件列表
const components = [table, pagination, virtualSelect, select, speakTts]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install: any = function (Vue: any, opts: any): void {
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
  table,
  pagination,
  virtualSelect,
  select,
  speakTts
}
