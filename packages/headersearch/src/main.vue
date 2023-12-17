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
    <el-row>
      <template v-for="(item, index) in formItem">
        <el-col
          v-if="cloumnsNum(index) <= 48"
          :key="index"
          :span="item.span || 6"
        >
          <XlFormItem
            v-model="form[item['prop']]"
            :item="item"
            @labelname="handleSetLabel"
          />
        </el-col>
        <div
          v-if="cloumnsOdd(index)"
          :key="index + 'col1'"
          class="clearfix"
        ></div>
      </template>
      <!-- 按钮 -->
      <el-col v-if="colTotal < 48" :span="48 - colTotal || 6">
        <slot name="button">
          <el-button type="primary" size="mini">搜索</el-button>
          <el-button size="mini">清空</el-button>
        </slot>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="collapse">
        <el-row>
          <template v-for="(item, index) in formItem">
            <el-col
              v-if="cloumnsNum(index) > 48"
              :key="index"
              :span="item.span || 6"
            >
              <XlFormItem
                v-model="form[item['prop']]"
                :item="item"
                @labelname="handleSetLabel"
              />
            </el-col>
            <div
              v-if="cloumnsOdd(index) && cloumnsNum(index) > 48"
              :key="index + 'col2'"
              class="clearfix"
            ></div>
          </template>
        </el-row>
      </div>
    </el-collapse-transition>
    <div v-if="colTotal >= 48" class="flex justify-end items-center w-full">
      <slot name="button">
        <el-button type="primary" size="mini" @click="handleSearch"
          >搜索</el-button
        >
        <el-button size="mini">清空</el-button>
      </slot>
      <el-button
        v-if="colTotal > 48"
        type="text"
        size="mini"
        :icon="collapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        @click="collapse = !collapse"
      >
        {{ collapse ? '收起' : '展开' }}
      </el-button>
    </div>
  </el-form>
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
  // model =======================
  @Model('change', { type: String }) readonly value!: string

  // emit ========================

  @Emit('change')
  public handleChange(): string {
    return ''
  }

  // Watch ======================
  @Watch('formItem', { immediate: true, deep: true })
  public handleWatch(data: []) {
    let total = 0
    data.forEach((item: formItemType) => {
      total += item.span || 6
    })
    this.colTotal = total
  }
  //data==========================
  collapse = false
  colTotal = 0
  form: any = {}
  label = {}

  // vmounted
  async mounted() {
    await this.$nextTick()
    this.form = JSON.parse(JSON.stringify(this.formData))
  }

  // methods====================
  public cloumnsNum(i: number): number {
    let col = 0
    this.formItem.every((item, n) => {
      col += item.span || 6
      return i > n
    })
    return col
  }
  public cloumnsOdd(i: number): boolean {
    let col = 0
    this.formItem.every((item, n) => {
      col += item.span || 6
      return i > n
    })
    return col % 24 === 0
  }
  public handleSetLabel(data: { prop: string; data: string | [] }) {
    this.$set(this.label, data.prop, data.data)
  }
  //搜索
  public handleSearch() {
    ;(this.$refs.myform as any).validate((valid: boolean) => {
      console.log(valid)
      if (valid) {
        console.log(111)
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
