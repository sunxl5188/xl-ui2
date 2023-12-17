import HeaderSearch from './src/main.vue'
;(HeaderSearch as any).install = (Vue: any) => {
  Vue.component((HeaderSearch as any).extendOptions.name, HeaderSearch)
}
export default HeaderSearch
