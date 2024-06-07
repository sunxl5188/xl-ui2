import MyTreeSelect from './src/main.vue'
MyTreeSelect.install = Vue => {
  Vue.component(MyTreeSelect.extendOptions.name, MyTreeSelect)
}
export default MyTreeSelect
