import XlTreeSelect from './src/main.vue'
;(XlTreeSelect as any).install = (Vue: any) => {
  Vue.component((XlTreeSelect as any).extendOptions.name, XlTreeSelect)
}
export default XlTreeSelect
