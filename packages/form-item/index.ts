import XlFormItem from './src/main.vue'
;(XlFormItem as any).install = (Vue: any) => {
  Vue.component((XlFormItem as any).extendOptions.name, XlFormItem)
}
export default XlFormItem
