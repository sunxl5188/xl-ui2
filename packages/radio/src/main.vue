<template>
  <el-radio-group v-model="checkValue" @change="handleChange">
    <el-radio
      v-for="(item, index) in options"
      :key="index"
      :label="item[props.value]"
      v-bind="$attrs"
    >
      {{ item[props.label] }}
    </el-radio>
  </el-radio-group>
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
import { getCode } from '@/utils/api'

interface optionType {
  label: string
  value: string | number
}

@Component({
  name: 'XlRadio',
  components: {}
})
export default class XlRadio extends Vue {
  // prop ========================
  //字段参数
  @Prop({
    type: Object,
    default() {
      return {
        value: 'value',
        label: 'label'
      }
    }
  })
  readonly props!: optionType

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly data!: []

  @Prop({
    type: String,
    default: ''
  })
  readonly code!: string
  //data =========================
  checkValue = ''
  checkLable = ''
  //所有数据
  options: Array<any> = []

  // model =======================
  // emit ========================

  //回调选中的值
  @Model('change', { type: String }) readonly value!: string

  @Emit('change')
  public handleChange(e: string): string {
    const data = this.options.filter((o: any) => o[this.props['value']] === e)
    if (data.length) {
      this.checkLable = data[0][this.props.label]
    }
    this.$attrs.labelname && this.handleLabelName()
    return e
  }

  @Emit('update:labelName')
  public handleLabelName(): string {
    return this.checkLable
  }

  @Watch('value', { immediate: true })
  public handleWatch(val: string): void {
    this.checkValue = JSON.parse(JSON.stringify(val))
  }

  // ---------------------
  async mounted() {
    await this.$nextTick()
    if (this.code) {
      this.getOption()
    } else if (this.data) {
      this.options = this.data as []
      if (this.checkValue) {
        this.handleChange(this.checkValue)
      }
    }
  }

  // 获取CODE这典
  public getOption() {
    getCode(this.$global.codeApi + this.code)
      .then((res: any) => {
        this.options = res.data
      })
      .catch(err => err)
  }
}
</script>

<style scoped lang="scss"></style>
