import select from './src/main.vue'
;(select as any).install = (Vue: any): void => {
  Vue.component((select as any).extendOptions.name, select)
}

export default select
