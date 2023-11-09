<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group
      v-model="checkList"
      :class="$attrs?.direction"
      @change="handleChange"
    >
      <el-checkbox
        v-for="(item, index) in options"
        :key="index"
        :label="item[props.value]"
        v-bind="$attrs"
      >
        {{ item[props.label] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Model,
  Emit
} from 'vue-property-decorator'
import { getCode } from '@/utils/api'
import { filter } from 'node_modules/vue/types/umd'

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
  checkLable: Array<string | number> = []
  optionVal: Array<string | number> = []

  isIndeterminate = false
  checkAll = false

  //所有数据
  options: Array<optionType> = []

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

  //排列方向
  /*   @Prop({
    type: String,
    default: 'horizontal' //vertical
  })
  readonly direction!: string */
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

  //回调选中的值
  @Model('change', { type: Array }) readonly value!: (string | number)[]

  @Emit('change')
  public handleChange(value: Array<string | number>): (string | number)[] {
    const data = this.options.filter(item =>
      this.checkList.includes(item[this.props.value])
    )
    this.checkLable = data.map(item => item[this.props.label])

    let checkedCount = value.length

    this.checkAll = checkedCount === this.options.length
    this.isIndeterminate =
      checkedCount > 0 && checkedCount < this.options.length

    return this.checkList
  }

  //------------------------
  @Watch('data')
  getData(val, oldVal) {
    console.log(val)
  }

  // ---------------------
  async mounted() {
    if (this.code) {
      const data = await this.getOption()
      this.options = data
    } else if (this.data) {
      this.options = this.data
    }
    this.optionVal = this.options.map(o => o[this.props.value])
  }

  //全选
  handleCheckAllChange(e: boolean) {
    this.checkList = e ? this.optionVal : []
    this.isIndeterminate = false
  }
  // 获取CODE这典
  getOption() {
    return new Promise((resolve, reject) => {
      getCode(this.global.codeApi, this.code)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-checkbox-group {
    &.vertical {
      & .el-checkbox {
        display: block;
      }
    }
  }
}
</style>
