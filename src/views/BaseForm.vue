<template>
  <div>
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

@Component({
  name: 'BaseForm',
  components: {}
})
export default class extends Vue {
  formData = {
    org: '111111',
    jddw: '0592',
    ifjt: '1',
    source: ['2', '3'],
    kpr: '1-2',
    address: ['350000', '350200', '350211'],
    gdsj: '2020-12-20 08:00:20',
    jdsj: '',
    fdsj: ['2020-12-20 08:00:20', '2024-01-25 00:00:00'],
    isgd: '1'
  }
  formItem = [
    {
      label: '工单编号',
      prop: 'org',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单单位',
      prop: 'jddw',
      type: 'select',
      formItemAttr: {},
      attribute: { labelname: 'jddwName', code: '1' }
    },
    {
      label: '是否接通',
      prop: 'ifjt',
      type: 'radio',
      formItemAttr: {},
      attribute: { labelname: 'sfjtName', code: '4' }
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
    },
    {
      label: '故障时间',
      prop: 'gdsj',
      type: 'date',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单时间',
      prop: 'jdsj',
      type: 'datetime',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '复电时间',
      prop: 'fdsj',
      type: 'date2',
      span: 12,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '来源',
      prop: 'source',
      span: 12,
      type: 'checkbox',
      formItemAttr: {},
      attribute: { labelname: 'sourceName', code: '9' }
    },
    {
      label: '是否归档',
      prop: 'isgd',
      type: 'switch',
      formItemAttr: {},
      attribute: {}
    }
  ]
  formAttribute = {}
  rules = {
    org: [{ required: true, message: '请输入工单编号' }],
    jddw: [{ required: true, message: '请选择接单单位' }],
    address: [{ required: true, message: '请选择接单单位' }]
  }

  public handleSaveForm(data: object): void {
    console.log(data)
  }
}
</script>

<style scoped></style>
