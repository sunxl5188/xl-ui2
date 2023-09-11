import table from './src/main.vue'
;(table as any).install = (Vue: any): void => {
  Vue.component((table as any).extendOptions.name, table)
}
export default table
