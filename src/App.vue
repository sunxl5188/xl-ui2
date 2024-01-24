<template>
  <div class="p-10">
    <XlForm
      ref="myform"
      :form-data="formData"
      :form-item="formItem"
      :rules="rules"
      :form-attribute="formAttribute"
      @change="handleSaveForm"
    ></XlForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// @ is an alias to /src

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  value = ['2']
  label = '双皮奶'
  options = [
    {
      value: '1',
      label: '黄金糕'
    },
    {
      value: '2',
      label: '双皮奶'
    },
    {
      value: '3',
      label: '蚵仔煎'
    },
    {
      value: '4',
      label: '龙须面'
    },
    {
      value: '5',
      label: '北京烤鸭'
    }
  ]
  formData = {
    org: ''
  }
  formItem = [
    {
      label: '工单编号',
      prop: 'org',
      type: 'input',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单单位',
      prop: 'jddw',
      type: 'select',
      formItemAttr: {},
      attribute: { data: this.options, labelname: 'jddwName' }
    }
  ]
  formAttribute = {}
  rules = {}
  mounted() {}

  handleSaveForm = () => {}
}
</script>

<style lang="scss" scoped></style>
