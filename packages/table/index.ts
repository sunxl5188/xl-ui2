import table from './src/main.vue'
;(table as any).install = (Vue: any): void => {
  Vue.component((table as any).extendOptions.name, table)
}
export interface pageType {
  currentPage: number
  pageSize: number
}

export default table
