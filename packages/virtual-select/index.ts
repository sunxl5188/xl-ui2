import virtualSelect from './src/main.vue'
;(virtualSelect as any).install = (Vue: any): void => {
  Vue.component((virtualSelect as any).extendOptions.name, virtualSelect)
}

export default virtualSelect
