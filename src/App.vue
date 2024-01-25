<template>
  <div class="p-10">
    {{ formData }}
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
  options2 = [
    {
      label: '是',
      value: '1'
    },
    {
      label: '否',
      value: '0'
    }
  ]
  options3 = [
    {
      label: '晋安区',
      value: '1'
    },
    {
      label: '高薪区',
      value: '2'
    },
    {
      label: '鼓楼区',
      value: '3'
    }
  ]
  formData = {
    org: '',
    jddw: '3',
    ifjt: '1',
    source: ['2', '3'],
    kpr: '1-2',
    address: ''
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
    },
    {
      label: '是否接通',
      prop: 'ifjt',
      type: 'radio',
      formItemAttr: {},
      attribute: { data: this.options2, labelname: 'sfjtName' }
    },
    {
      label: '来源',
      prop: 'source',
      type: 'checkbox',
      formItemAttr: {},
      attribute: { data: this.options3, labelname: 'sourceName' }
    },
    {
      label: '开票人',
      prop: 'kpr',
      type: 'tree',
      formItemAttr: {},
      attribute: { labelname: 'kprName' }
    },
    {
      label: '故障地址',
      prop: 'address',
      type: 'cascader',
      formItemAttr: {},
      attribute: { labelname: 'addressName' }
    }
  ]
  formAttribute = {}
  rules = {}
  mounted() {}

  handleSaveForm = () => {}
}
</script>

<style lang="scss" scoped></style>
