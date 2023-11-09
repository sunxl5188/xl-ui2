import checkbox from './src/main.vue'
;(checkbox as any).install = (Vue: any): void => {
  Vue.component((checkbox as any).extendOptions.name, checkbox)
}

export default checkbox
