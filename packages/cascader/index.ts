import XlCascader from './src/main.vue'
;(XlCascader as any).install = (Vue: any) => {
  Vue.component((XlCascader as any).extendOptions.name, XlCascader)
}

export default XlCascader
