<template>
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
    <div>{{ form }}</div>
    <el-row>
      <el-col
        v-for="(item, index) in formItem.slice(
          0,
          btnLast ? formItem.length : colLen
        )"
        :key="index"
        v-bind="{
          ...{
            xs: 24,
            sm: 12,
            md: 8,
            lg: 6,
            xl: 6
          },
          ...layout
        }"
      >
        {{ form[item['prop']] }}--{{ item['prop'] }}
        <XlFormItem
          v-model="form[item['prop']]"
          :item="item"
          @labelname="handleSetLabel"
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
        class="pl-3 pt-1"
      >
        <slot name="button">
          <el-button type="primary" size="mini" @click="handleSearch"
            >搜索</el-button
          >
          <el-button size="mini" @click="resetForm">清空</el-button>
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
              v-bind="{
                ...{
                  xs: 24,
                  sm: 12,
                  md: 8,
                  lg: 6,
                  xl: 6
                },
                ...layout
              }"
            >
              <XlFormItem
                v-model="form[item['prop']]"
                :item="item"
                @labelname="handleSetLabel"
              />
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <div class="flex justify-end items-center w-full">
        <slot name="button">
          <el-button type="primary" size="mini" @click="handleSearch"
            >搜索</el-button
          >
          <el-button size="mini">清空</el-button>
        </slot>
        <el-button
          v-if="formItem.length > colLen"
          type="text"
          size="mini"
          :icon="collapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          @click="collapse = !collapse"
        >
          {{ collapse ? '收起' : '展开' }}
        </el-button>
      </div>
    </template>
  </el-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import XlFormItem from '../../form-item/src/main.vue'
import { formItemType } from '@/utils/interface'

@Component({
  name: 'HeaderSearch',
  components: { XlFormItem }
})
export default class HeaderSearch extends Vue {
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
  //显示行数 默认2 1和2
  @Prop({
    type: Number,
    default: 2
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

  // emit ========================

  // Watch ======================

  //data==========================
  collapse = false
  form: any = {}
  label = {}
  colLen = 0
  // vmounted
  mounted() {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
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

  public handleSetLabel(data: { prop: string; data: string | [] }) {
    this.$set(this.label, data.prop, data.data)
  }
  //搜索
  public handleSearch() {
    ;(this.$refs.myform as any).validate((valid: boolean) => {
      if (valid) {
        const data = { ...this.form, ...this.label }
        this.$emit('search', data)
      }
    })
  }

  //重置表单
  public resetForm() {
    ;(this.$refs.myform as any).resetFields()
    this.form = JSON.parse(JSON.stringify(this.formData))
    this.handleSearch()
  }

  @Watch('formData', { immediate: true, deep: true })
  public handleWatch(data: object): void {
    this.form = JSON.parse(JSON.stringify(data))
  }
}
</script>

<style scoped lang="scss"></style>
