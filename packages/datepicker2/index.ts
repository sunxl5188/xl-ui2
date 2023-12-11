import XlDatePicker2 from './src/main.vue'
;(XlDatePicker2 as any).install = (Vue: any) => {
  Vue.component((XlDatePicker2 as any).extendOptions.name, XlDatePicker2)
}
export default XlDatePicker2
