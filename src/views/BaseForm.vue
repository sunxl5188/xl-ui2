<template>
  <div>
    <XlForm
      ref="myForm"
      :form-data="formData"
      :form-item="formItem"
      :rules="rules"
      :form-attribute="formAttribute"
      :showButton="false"
      @change="handleSaveForm"
    >
      <div slot="customItem">22</div>
      <template #customItem="{ row, form }">
        <el-input
          v-model="form[row.prop]"
          placeholder="自定义输入框"
          clearable
        />
      </template>
    </XlForm>
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
    custom: '',
    org: '111111',
    jddw: '0592',
    ifjt: '1',
    source: ['1'],
    kpr: '1-2',
    address: ['350000', '350200', '350211'],
    gdsj: '2020-12-20 08:00:20',
    jdsj: '',
    fdsj: ['2020-12-20 08:00:20', '2024-01-25 00:00:00'],
    isgd: '1',
    text: '123456',
    check: ['2']
  }
  formItem = [
    {
      label: '插槽',
      prop: 'custom',
      slotName: 'customItem',
      formItemAttr: {},
      attribute: {}
    },
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
      attribute: { labelName: 'jddwName', code: '1' }
    },
    {
      label: '是否接通',
      prop: 'ifjt',
      type: 'radio',
      formItemAttr: {},
      attribute: { labelName: 'sfjtName', code: '4' }
    },
    {
      label: '开票人',
      prop: 'kpr',
      type: 'tree',
      formItemAttr: {},
      attribute: { labelName: 'kprName' }
    },
    {
      label: '故障地址',
      prop: 'address',
      type: 'cascader',
      formItemAttr: {},
      attribute: { labelName: 'addressName' }
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
      label: '是否归档',
      prop: 'isgd',
      type: 'switch',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '文本',
      prop: 'text',
      type: 'text',
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
      attribute: { labelName: 'sourceName', code: '9' }
    },
    {
      label: '多选框',
      prop: 'check',
      type: 'checkbox',
      span: 12,
      formItemAttr: {},
      attribute: { code: '2' }
    }
  ]
  formAttribute = {}
  rules = {
    org: [{ required: true, message: '请输入工单编号' }],
    jddw: [{ required: true, message: '请选择接单单位' }],
    address: [{ required: true, message: '请选择接单单位' }]
  }
  public handleSubmit(): void {
    ;(this.$refs.myForm as any).handleSubmit()
  }
  public handleSaveForm(data: object): void {
    console.log(data)
  }
}
</script>
