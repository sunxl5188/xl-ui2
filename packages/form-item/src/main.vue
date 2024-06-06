<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
    v-bind="item.formItemAttr"
    :style="item.type === 'text' ? 'margin-bottom:0px' : ''"
  >
    <template v-if="item.type === 'select'">
      <XlSelect
        v-model="values"
        :labelName.sync="labelName"
        :props="item.attribute.props || { value: 'value', label: 'label' }"
        :attribute="{
          ...{
            placeholder: '请选择',
            clearable: true
          },
          ...item.attribute
        }"
        :events="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'tree'">
      <XlTreeSelect
        v-model="values"
        :labelName.sync="labelName"
        :attribute="item.attribute"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'checkbox'">
      <XlCheckBox
        v-model="values"
        :labelName.sync="labelName"
        :props="item.attribute.props || { value: 'value', label: 'label' }"
        v-bind="item.attribute"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'radio'">
      <XlRadio
        v-model="values"
        :labelName.sync="labelName"
        :props="item.attribute.props || { value: 'value', label: 'label' }"
        v-bind="item.attribute"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'cascader'">
      <XlCascader
        v-model="values"
        :labelName.sync="labelName"
        v-bind="{
          ...{
            placeholder: '请输入',
            clearable: true
          },
          ...item.attribute
        }"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'date'">
      <el-date-picker
        v-model="values"
        :id="item.prop"
        v-bind="{
          ...{
            type: 'datetime',
            placeholder: '选择日期时间',
            'default-time': $dayjs().format('HH:mm:ss'),
            'value-format': 'yyyy-MM-dd HH:mm:ss'
          },
          ...item.attribute
        }"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'date2'">
      <XlDatePicker2
        v-model="values"
        :attribute1="item.attribute1 || {}"
        :attribute2="item.attribute2 || {}"
        :events1="item.events1 || {}"
        :events2="item.events2 || {}"
        @change="handleChange"
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
        @change="handleChange"
      >
      </el-switch>
    </template>
    <template v-else-if="item.type === 'textarea'">
      <el-input
        v-model.trim="values"
        type="textarea"
        :id="item.prop"
        clearable
        v-bind="{
          ...{
            placeholder: '请输入',
            maxlength: 1000,
            'show-word-limit': true,
            rows: 4,
            resize: 'none',
            clearable: true
          },
          ...item.attribute
        }"
        v-on="item.events"
        @change="handleChange"
      />
    </template>
    <template v-else-if="item.type === 'text'"> {{ values }}</template>
    <template v-else>
      <el-input
        v-model.trim="values"
        :id="item.prop"
        v-bind="{
          ...{
            placeholder: '请输入',
            clearable: true
          },
          ...item.attribute
        }"
        v-on="item.events"
        @change="handleChange"
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

type valType = string | number | string[] | number[]

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
  public handleChange(): valType {
    this.handleGetLabel()
    return this.values || ''
  }

  // data ==========================
  values: valType = ''
  labelName: valType = ''

  @Watch('value', { deep: true, immediate: true })
  handleWatchVal(e: valType) {
    this.values = e || ''
  }

  // methods ==================
  @Emit('labelName')
  public handleSetLabel(): any {
    return { prop: this.item.attribute.labelName, data: this.labelName }
  }
  mounted() {
    setTimeout(() => {
      this.handleGetLabel()
    }, 500)
  }

  public handleGetLabel() {
    if (this.item.attribute && this.value) {
      if (
        this.item.attribute.labelName &&
        ['select', 'cascader', 'radio', 'checkbox', 'tree'].includes(
          this.item.type
        )
      ) {
        this.handleSetLabel()
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-date-editor,
  .el-cascader,
  .el-select {
    width: 100%;
  }
}
</style>
