<template>
  <div>
    <el-select v-model="values" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item[props.label]"
        :value="item[props.value]"
      >
      </el-option>
    </el-select>
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
import request from '@/utils/request'

interface optionType {
  label: string
  value: string
}

@Component({
  name: 'XlSelect',
  components: {}
})
export default class XlSelect extends Vue {
  values = ''
  labels = ''
  options: Array<any> = []

  /*   @Prop({
    type: String,
    default: ''
  })
  readonly value!: string */

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly attribute!: object

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

  //code的附加参数
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly params!: object

  // data数据
  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly data!: []

  @Model('change', { type: String }) readonly value!: string

  @Emit('change')
  public handleChange(): string | string[] {
    return this.values
  }

  //监听value值
  @Watch('value', { immediate: true })
  handleValueChange(val: string) {
    this.values = val
  }

  @Watch('values', { immediate: true })
  handleValuesChange(val: string) {
    if (val) {
      const data = this.options.filter(o => val.includes(o[this.props.value]))
      const label = data.map(item => item[this.props.label])
      this.labels = label.join(',')
    }
  }

  // ---------------------
  mounted() {
    if (this.code) {
      this.getOption()
    } else if (this.data) {
      this.options = this.data
    }
  }
  // 获取CODE这典
  getOption() {
    request({
      url: `/index/code/index/code/${this.code}`,
      method: 'get'
    })
      .then(res => {
        this.options = res.data
      })
      .catch(err => err)
  }
}
</script>

<style scoped></style>
