import XlRadio from './src/main.vue'
;(XlRadio as any).install = (Vue: any): void => {
  Vue.component((XlRadio as any).extendOptions.name, XlRadio)
}

export default XlRadio
