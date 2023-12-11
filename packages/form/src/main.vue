<template>
  <div>
    <el-form
      :model="form"
      v-bind="{
        ...{
          'label-width': '120px',
          'label-suffix': ':',
          inline: false,
          'label-position': 'right'
        },
        ...formAttribute
      }"
      @submit.native.prevent
    >
      <el-form-item
        v-for="(item, index) in formItem"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <XlSelect
          v-if="item.type === 'select'"
          v-model="form[item.prop]"
          :attribute="{ ...item.attribute, ...{ prop: item.prop } }"
          v-bind="{ ...item.attribute, ...{ prop: item.prop } }"
          :events="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
          v-on="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
        />
        <XlCheckBox
          v-else-if="item.type === 'check'"
          v-model="form[item.prop]"
          v-bind="{ ...item.attribute, ...{ prop: item.prop } }"
          v-on="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
        />
        <XlRadio
          v-else-if="item.type === 'radio'"
          v-model="form[item.prop]"
          v-bind="{ ...item.attribute, ...{ prop: item.prop } }"
          v-on="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
        />
        <XlCascader
          v-else-if="item.type === 'cascader'"
          v-model="form[item.prop]"
          clearable
          v-bind="{
            ...{
              placeholder: '请输入'
            },
            ...item.attribute,
            ...{ prop: item.prop }
          }"
          v-on="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
        />
        <el-input
          v-else-if="item.type === 'textarea'"
          type="textarea"
          v-model="form[item.prop]"
          clearable
          v-bind="{
            ...{
              placeholder: '请输入',
              maxlength: 1000,
              'show-word-limit': true,
              rows: 4,
              resize: 'none'
            },
            ...item.attribute,
            ...{ prop: item.prop }
          }"
          v-on="{
            ...{ labelname: handleSetLabel },
            ...item.events
          }"
        />
        <el-input
          v-else
          v-model="form[item.prop]"
          v-bind="item.attribute"
          v-on="item.events"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import XlCascader from '@/cascader'
import {
  Component,
  Emit,
  Model,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

interface formItemType {
  label: string
  prop: string
  type: string
  span?: number
  data?: string[]
  code?: string
  attribute?: object
  events?: object
  formItemAttr?: object
}

@Component({
  name: 'XlForm',
  components: {}
})
export default class XlForm extends Vue {
  // prop ========================

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly formData!: object

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly formItem!: formItemType[]

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly formAttribute!: object

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly rules!: object

  // data ==================================
  form = {}
  label = {}

  // model =======================
  @Model('change', { type: Object }) readonly value!: object
  @Emit('change')
  public handleChange(data: object) {
    this.handleLabelName()
    return data
  }
  // emit ========================
  @Emit('labelname')
  public handleLabelName() {
    return this.label
  }

  // Watch ======================
  @Watch('form', { immediate: true, deep: true })
  handleWatchFormData(data: object) {
    this.handleChange(data)
  }

  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formData))
  }

  public handleSetLabel(data: { prop: string; data: string | [] }) {
    this.$set(this.label, data.prop, data.data)
  }
}
</script>

<style scoped lang="scss"></style>
