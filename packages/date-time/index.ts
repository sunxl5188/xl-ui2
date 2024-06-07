import XlDateTime from './src/main.vue'
;(XlDateTime as any).install = (Vue: any) => {
  Vue.component((XlDateTime as any).extendOptions.name, XlDateTime)
}
export default XlDateTime
