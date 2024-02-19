<template>
  <div>
    <el-form
      ref="myform"
      :model="form"
      :rules="rules"
      v-bind="{
        ...{
          inline: false,
          'label-width': '100px',
          'label-suffix': '',
          'label-position': 'right',
          'show-message': false
        },
        ...formAttribute
      }"
      @submit.native.prevent
    >
      <el-row>
        <el-col
          v-for="(item, index) in formItem.slice(
            0,
            btnLast ? formItem.length : colLen
          )"
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
        <!-- 按钮 -->
        <el-col
          v-if="btnLast"
          v-bind="{
            ...{
              xs: 24,
              sm: 12,
              md: 8,
              lg: 6,
              xl: 4
            },
            ...layout
          }"
          class="pl-3"
        >
          <slot>
            <el-button type="primary" @click="handleSearch"> 搜索 </el-button>
            <el-button @click="resetForm"> 清空 </el-button>
          </slot>
        </el-col>
      </el-row>
      <template v-if="!btnLast">
        <el-collapse-transition>
          <div v-show="collapse">
            <el-row>
              <el-col
                v-for="(item, index) in formItem.slice(colLen, formItem.length)"
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
            </el-row>
          </div>
        </el-collapse-transition>
        <div class="flex justify-end items-center w-full">
          <slot>
            <el-button type="primary" @click="handleSearch"> 搜索 </el-button>
            <el-button @click="resetForm">清空</el-button>
          </slot>
          <el-button
            v-if="formItem.length > colLen"
            type="text"
            :icon="collapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="collapse = !collapse"
          >
            {{ collapse ? '收起' : '展开' }}
          </el-button>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import XlFormItem from '../../form-item/src/main.vue'
import { formItemType } from '@/utils/interface'

@Component({
  name: 'XlHeaderSearch',
  components: { XlFormItem }
})
export default class XlHeaderSearch extends Vue {
  // prop ========================

  @Prop({ type: Object, default: () => {} })
  readonly formData!: any

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
  //显示行数 默认2 1和2
  @Prop({
    type: Number,
    default: 1
  })
  readonly showRow!: number

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly layout!: object

  @Prop({
    type: Boolean,
    default: false
  })
  readonly btnLast!: boolean

  //data==========================
  collapse = false
  form: any = {}
  label = {}
  colLen = 0
  // vmounted
  mounted() {
    this.form = Object.assign({}, this.formData)
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
    this.formItem.forEach(item => {
      if (['select'].includes(item.type) && this.formData[item.prop]) {
        this.handleSetLabel(this.formData[item.prop], item.prop)
      }
    })
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  }

  // methods====================
  public getWindowWidth() {
    const w = document.documentElement.clientWidth
    let count = [2, 4, 6, 8, 8]
    if (this.showRow === 1) {
      count = [1, 2, 3, 4, 4]
    }
    if (w < 768) {
      this.colLen = count[0]
    }
    if (w >= 768) {
      this.colLen = count[1]
    }
    if (w >= 992) {
      this.colLen = count[2]
    }
    if (w >= 1200) {
      this.colLen = count[3]
    }
    if (w >= 1920) {
      this.colLen = count[4]
    }
  }

  public handleSetLabel(
    data: string | number | string[] | number[],
    prop: string | undefined
  ) {
    if (prop) {
      this.$set(this.form, prop, data)
    }
  }

  //搜索
  public handleSearch() {
    ;(this.$refs.myform as any).validate((valid: boolean) => {
      if (valid) {
        let data = { ...this.form, ...this.label }
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            let item = data[key]
            if (Object.prototype.toString.call(item) === '[object Array]') {
              data[key] = item.join(',')
            }
          }
        }
        this.$emit('search', data)
      }
    })
  }

  //重置表单
  public resetForm() {
    ;(this.$refs.myform as any).resetFields()
    let obj: any = {}
    for (const key in this.formData) {
      if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
        const item = (this.formData as any)[key]
        if (item === undefined) {
          obj[key] = ''
        } else {
          obj[key] = item
        }
      }
    }
    this.form = obj
    let data = { ...this.form, ...this.label }
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let item = data[key]
        if (Object.prototype.toString.call(item) === '[object Array]') {
          data[key] = item.join(',')
        }
      }
    }
    this.$emit('cancel', data)
  }
}
</script>

<style scoped lang="scss"></style>
