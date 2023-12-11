import XlForm from './src/main.vue'
;(XlForm as any).install = (Vue: any): void => {
  Vue.component((XlForm as any).extendOptions.name, XlForm)
}

export default XlForm
