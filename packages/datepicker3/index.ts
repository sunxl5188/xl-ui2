import XlDatePicker3 from './src/main.vue'
;(XlDatePicker3 as any).install = (Vue: any) => {
  Vue.component((XlDatePicker3 as any).extendOptions.name, XlDatePicker3)
}
export default XlDatePicker3
