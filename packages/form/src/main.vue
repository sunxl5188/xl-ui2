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
      <el-row :gutter="0">
        <template v-for="(item, index) in formItem">
          <el-col :key="index" :span="item.span || 6">
            <slot
              v-if="item.slotname"
              :name="item.slotname"
              :row="item"
              :form="form"
            >
            </slot>
            <el-form-item v-else :label="item.label" :prop="item.prop">
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
              <!--date2日期-->
              <XlDatePicker2
                v-else-if="item.type === 'date2'"
                v-model="form[item.prop]"
                :endTime.sync="form[item.prop2]"
                v-bind="{
                  ...item.attribute,
                  ...{ prop: [item.prop, item.prop2] }
                }"
                v-on="{
                  ...{ labelname: handleSetLabel },
                  ...item.events
                }"
              />
              <!--date3日期-->
              <XlDatePicker3
                v-else-if="item.type === 'date3'"
                v-model="form[item.prop]"
                :endTime.sync="form[item.prop2]"
                v-bind="{
                  ...item.attribute,
                  ...{ prop: [item.prop, item.prop2] }
                }"
                v-on="{
                  ...{ labelname: handleSetLabel },
                  ...item.events
                }"
              />
              <el-switch
                v-else-if="item.type === 'switch'"
                v-model="form[item.prop]"
                v-bind="{
                  ...{ 'active-value': 1, 'inactive-value': 0 },
                  ...item.attribute
                }"
                v-on="item.events"
              >
              </el-switch>
              <el-input
                v-else-if="item.type === 'textarea'"
                type="textarea"
                v-model="form[item.prop]"
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
                  ...{ labelname: handleSetLabel },
                  ...item.events
                }"
              />
              <el-input
                v-else
                v-model="form[item.prop]"
                v-bind="{
                  ...{
                    placeholder: '请输入',
                    clearable: true
                  },
                  ...item.attribute,
                  ...{ prop: item.prop }
                }"
                v-on="item.events"
              />
            </el-form-item>
          </el-col>
          <template v-if="cloumnsNum(index)">
            <div :key="index + 'div'" class="clear-both"></div>
          </template>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
/**
 * 插槽使用
 * <template #custom="{ row, form }">
 *  <el-form-item label="自定义">
 *    <el-input vmodel="form[row.prop]" />
 *  </el-form-item>
 * </template>
 **/
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
  prop2: string
  type: string
  slotname: string
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

  //=========================
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formData))
  }

  public handleSetLabel(data: { prop: string; data: string | [] }) {
    this.$set(this.label, data.prop, data.data)
  }

  public cloumnsNum(i: number): boolean {
    let len = 0
    this.formItem.every((item, index, arr) => {
      if (index <= i) {
        len += item.span || 6
      }
      return index <= i
    })
    return len % 24 === 0
  }
}
</script>

<style scoped lang="scss">
.clear-both {
  width: 100%;
  height: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  display: block;
}

::v-deep {
  .el-form-item__content {
    .el-cascader,
    .el-select {
      width: 100%;
    }
  }
}
</style>
