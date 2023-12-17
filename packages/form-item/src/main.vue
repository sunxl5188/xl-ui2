<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
    v-bind="item.formItemAttr"
  >
    <template v-if="item.slotname">
      <slot :name="item.slotname" :row="item"></slot>
    </template>
    <template v-if="item.type === 'select'">
      <XlSelect
        v-model="values"
        :props="item.attribute.props || { value: 'value', label: 'label' }"
        :attribute="{
          ...{
            placeholder: '请选择',
            clearable: true
          },
          ...item.attribute,
          ...{ prop: item.prop }
        }"
        :events="item.events"
        v-on="{ labelname: handleSetLabel }"
      />
    </template>
    <template v-else-if="item.type === 'check'">
      <XlCheckBox
        v-model="values"
        v-bind="{ ...item.attribute, ...{ prop: item.prop } }"
        v-on="{
          ...{ labelname: handleSetLabel },
          ...item.events
        }"
      />
    </template>
    <template v-else-if="item.type === 'radio'">
      <XlRadio
        v-model="values"
        v-bind="{ ...item.attribute, ...{ prop: item.prop } }"
        v-on="{
          ...{ labelname: handleSetLabel },
          ...item.events
        }"
      />
    </template>
    <template v-else-if="item.type === 'cascader'">
      <XlCascader
        v-model="values"
        v-bind="{
          ...{
            placeholder: '请输入',
            clearable: true
          },
          ...item.attribute,
          ...{ prop: item.prop }
        }"
        v-on="{
          ...{ labelname: handleSetLabel },
          ...item.events
        }"
      />
    </template>
    <template v-else-if="item.type === 'date'">
      <el-date-picker
        v-model="values"
        v-bind="{
          ...{
            type: 'datetime',
            placeholder: '选择日期时间',
            'default-time': $dayjs().format('HH:mm:ss'),
            'value-format': 'yyyy-MM-dd HH:mm:ss'
          },
          ...item.attribute
        }"
        v-on="{
          ...{},
          ...item.events
        }"
      />
    </template>
    <template v-else-if="item.type === 'date2'">
      <XlDatePicker2
        v-model="values"
        v-bind="{
          ...item.attribute,
          ...{ prop: item.prop }
        }"
        v-on="{
          ...{},
          ...item.events
        }"
      />
    </template>
    <template v-else-if="item.type === 'switch'">
      <el-switch
        v-model="values"
        v-bind="{
          ...{ 'active-value': '1', 'inactive-value': '0' },
          ...item.attribute
        }"
        v-on="item.events"
      >
      </el-switch>
    </template>
    <template v-else-if="item.type === 'textarea'">
      <el-input
        type="textarea"
        v-model="values"
        v-bind="{
          ...{
            placeholder: '请输入',
            maxlength: 1000,
            'show-word-limit': true,
            rows: 4,
            resize: 'none',
            clearable: true
          },
          ...item.attribute,
          ...{ prop: item.prop }
        }"
        v-on="{
          ...{},
          ...item.events
        }"
      />
    </template>
    <template v-else>
      <el-input
        v-model="values"
        v-bind="{
          ...{
            placeholder: '请输入',
            clearable: true
          },
          ...item.attribute
        }"
        v-on="item.events"
      />
    </template>
  </el-form-item>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Model,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'
import { formItemType } from '@/utils/interface'

@Component({
  name: 'XlFormItem',
  components: {}
})
export default class XlFormItem extends Vue {
  // prop ========================
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly item!: formItemType

  // model =======================
  @Model('change', { type: [Array, String, Number] }) readonly value!:
    | string
    | string[]
    | number
  @Emit('change')
  public handleChange(): string | string[] | number {
    return this.values
  }

  // emit ========================

  // data ==========================
  values = ''
  label = ''

  // watch============
  @Watch('values', { immediate: true, deep: true })
  public handleWatch(): void {
    this.handleChange()
  }

  // methods ==================
  @Emit('labelname')
  public handleSetLabel(data: { prop: string; data: string | [] }): {
    prop: string
    data: string | []
  } {
    return data
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-date-editor,
  .el-cascader,
  .el-select {
    width: 100%;
  }
}
</style>
