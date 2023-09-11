import Pagination from './src/main.vue'
;(Pagination as any).install = (Vue: any): void => {
  Vue.component((Pagination as any).extendOptions.name, Pagination)
}
export default Pagination
