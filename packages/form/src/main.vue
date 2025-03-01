<template>
  <el-form
    ref="myForm"
    :model="form"
    :rules="rules"
    v-bind="{
      ...{
        'label-width': '120px',
        'label-suffix': ':',
        inline: false,
        'label-position': 'right'
      },
      ...formAttribute
    }"
    @submit.native.prevent="handleSubmit"
  >
    <el-row :gutter="0">
      <template v-for="(item, index) in formItem">
        <el-col
          :key="index"
          v-bind="
            item.span
              ? { span: item.span }
              : {
                  ...{
                    xs: 24,
                    sm: 12,
                    md: 8,
                    lg: 6,
                    xl: 6
                  },
                  ...layout
                }
          "
        >
          <template v-if="item.slotName">
            <slot
              v-if="item.type === 'custom'"
              :name="item.slotName"
              :row="item"
              :form="form"
            ></slot>
            <el-form-item
              v-else
              :label="item.label"
              :prop="item.prop"
              v-bind="item.formItemAttr"
            >
              <slot :name="item.slotName" :row="item" :form="form"></slot>
            </el-form-item>
          </template>
          <XlFormItem
            v-else
            v-model="form[item['prop']]"
            :item="item"
            @labelName="handleSetLabel"
          />
        </el-col>
      </template>
    </el-row>
    <slot v-if="showButton" name="button">
      <el-form-item>
        <el-button type="primary" native-type="submit">
          {{ confirmText }}
        </el-button>
        <el-button @click="handleResetForm">
          {{ resetText }}
        </el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script lang="ts">
/**
 * 插槽使用
 * <template #custom="{ row, form }">
 *  <el-form-item label="自定义">
 *    <el-input v-model="form[row.prop]" />
 *  </el-form-item>
 * </template>
 **/
import { Component, Emit, Model, Prop, Vue } from 'vue-property-decorator'
import XlFormItem from '../../form-item/src/main.vue'
import { formItemType } from '@/utils/interface'

@Component({
  name: 'XlForm',
  components: { XlFormItem }
})
export default class XlForm extends Vue {
  // prop ========================
  @Prop({ type: Boolean, default: true })
  readonly showButton!: boolean

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
  readonly formData!: object

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

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly layout!: object

  @Prop({
    type: String,
    default: '保存'
  })
  readonly confirmText!: string

  @Prop({
    type: String,
    default: '重置'
  })
  readonly resetText!: string

  // data ==================================
  defaultFormData: object = {}
  form: any = {}

  // model =======================
  @Model('input', { type: Object }) readonly value!: object
  @Emit('input')
  public handleChange(data: object) {
    return data
  }
  //=========================
  mounted() {
    this.defaultFormData = { ...this.formData }
    this.form = { ...this.formData }
  }

  public handleSetLabel({
    prop,
    data
  }: {
    prop: string
    data: string | string[]
  }) {
    if (prop) {
      console.log(prop, data)
      this.$set(this.form, prop, data)
    }
  }

  //提交数据
  public handleSubmit() {
    ;(this.$refs.myForm as any).validate((valid: boolean, error: any) => {
      if (valid) {
        let data = { ...this.form }
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const item = data[key]
            if (Object.prototype.toString.call(item) === '[object Array]') {
              data[key] = item.join(',')
            }
          }
        }
        this.$emit('change', data)
      } else if ((this.formAttribute as any)['show-message'] === false) {
        for (const key in error) {
          if (Object.prototype.hasOwnProperty.call(error, key)) {
            const { message } = error[key][0]
            this.$message({ message, type: 'error' })
            break
          }
        }
      }
    })
  }
  //重置表单
  public handleResetForm() {
    this.form = { ...this.defaultFormData }
  }
}
</script>
