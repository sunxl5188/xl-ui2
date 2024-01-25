<template>
  <div>
    {{ form }}
    <el-form
      ref="myform"
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
      @submit.native.prevent
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
            <XlFormItem
              v-model="form[item['prop']]"
              :item="item"
              @labelname="handleSetLabel($event, item.attribute.labelname)"
            />
          </el-col>
          <template v-if="cloumnsNum(index)">
            <div :key="index + 'div'" class="clearfix"></div>
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
import {
  Component,
  Emit,
  Model,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'
import XlFormItem from '../../form-item/src/main.vue'
import { formItemType } from '@/utils/interface'

@Component({
  name: 'XlForm',
  components: { XlFormItem }
})
export default class XlForm extends Vue {
  // prop ========================
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

  // data ==================================
  form: any = {}
  label = {}

  // model =======================
  @Model('input', { type: Object }) readonly value!: object
  @Emit('input')
  public handleChange(data: object) {
    return data
  }
  // Watch ======================
  @Watch('form', { immediate: true, deep: true })
  handleWatchFormData(data: object) {
    //this.handleChange(data)
  }

  //=========================
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formData))
  }

  public handleSetLabel(
    data: string | number | string[] | number[],
    prop: string | undefined
  ) {
    if (prop) {
      this.$set(this.form, prop, data)
    }
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

  //提交数据
  public handleSubmit() {
    ;(this.$refs.myform as any).validate((valid: boolean, error: any) => {
      if (valid) {
        let data = { ...this.form, ...this.label }
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const item = data[key]
            if (Object.prototype.toString.call(item) === '[object Array]') {
              data[key] = item.join(',')
            }
          }
        }
        this.$emit('change', data)
      } else {
        if ((this.formAttribute as any)['show-message'] === false) {
          for (const key in error) {
            if (Object.prototype.hasOwnProperty.call(error, key)) {
              const { message } = error[key][0]
              this.$message({ message, type: 'error' })
              break
            }
          }
        }
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
