import XlHeaderSearch from './src/main.vue'
;(XlHeaderSearch as any).install = (Vue: any) => {
  Vue.component((XlHeaderSearch as any).extendOptions.name, XlHeaderSearch)
}
export default XlHeaderSearch
