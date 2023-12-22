<template>
  <div class="h-0">
    <el-checkbox
      v-if="isAll"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox
        v-for="(item, index) in options"
        :key="index"
        :label="item[props['value']]"
        v-bind="$attrs"
      >
        {{ item[props['label']] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from 'vue-property-decorator'
import { getCode } from '@/utils/api'

interface optionType {
  label: string
  value: string | number
}

@Component({
  name: 'XlCheckBox',
  components: {}
})
export default class XlCheckBox extends Vue {
  //选中值
  checkList: Array<string | number> = []
  checkLable = ''
  optionVal: Array<string | number> = []

  isIndeterminate = false
  checkAll = false

  //所有数据
  options: Array<any> = []

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

  // code 字典表码-----------------------------
  @Prop({
    type: String,
    default: ''
  })
  readonly code!: string

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly data!: object[]

  //是否显示全选

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isAll!: boolean

  //回调选中的值
  @Model('change', { type: [Array, String] }) readonly value!: [] | string

  @Emit('change')
  public handleChange(value: Array<string | number>): (string | number)[] {
    const data = this.options.filter((item: any) => {
      return this.checkList.includes(item[this.props['value']])
    })

    let labArr = data.map((item: any) => {
      return item[this.props.label]
    })
    this.checkLable = labArr.join(',')

    let checkedCount = value.length

    this.checkAll = checkedCount === this.options.length
    this.isIndeterminate =
      checkedCount > 0 && checkedCount < this.options.length
    this.$attrs.labelname && this.handleLabelName()
    return this.checkList
  }

  @Emit('labelname')
  public handleLabelName() {
    return { prop: this.$attrs.labelname, data: this.checkLable }
  }

  // ---------------------
  mounted() {
    if (this.data) {
      this.options = this.data as []
    }
    if (this.code) {
      this.getOption()
    }
    this.optionVal = this.options.map((o: any) => o[this.props['value']])
  }

  //全选
  handleCheckAllChange(e: any) {
    this.checkList = e ? this.optionVal : []
    this.isIndeterminate = false
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
