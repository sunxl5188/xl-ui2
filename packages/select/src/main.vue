<template>
  <div>
    <el-select
      v-model="values"
      v-bind="{
        ...{
          clearable: true,
          filterable: true,
          placeholder: '请选择',
          'collapse-tags': true
        },
        ...attribute
      }"
      v-on="events"
      @change="handleChange"
    >
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
import { Component, Vue, Prop, Model, Emit } from 'vue-property-decorator'
import { getCode } from '@/utils/api'

interface optionType {
  label: string
  value: string
}

@Component({
  name: 'XlSelect',
  components: {}
})
export default class XlSelect extends Vue {
  values: string | [] = ''
  labels = ''
  options: Array<any> = []

  //绑定属性
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly attribute!: object
  //绑定事件
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly events!: object

  //字段
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

  // data数据
  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly data!: []

  //回调
  @Model('change', { type: [String, Array] }) readonly value!: string | string[]

  @Emit('change')
  public handleChange(e: string | string[]): string | [] {
    let data
    if (e) {
      if (Object.prototype.toString.call(e) === '[object Array]') {
        data = this.options.filter((o: optionType) => {
          return e.includes(o[this.props.value])
        })
        if (data.length) {
          let labArr = data.map(item => item[this.props.label])
          this.labels = labArr.join(',')
        }
      } else {
        data = this.options.filter((o: optionType) => {
          return o[this.props.value] === e
        })
        if (data.length) {
          this.labels = data[0][this.props.label]
        }
      }
    } else {
      this.labels = ''
    }

    this.handleLabelName()
    return this.values
  }

  @Emit('labelname')
  public handleLabelName() {
    return { prop: this.$attrs.prop, data: this.labels }
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
    getCode(this.$global.codeApi + this.code)
      .then((res: any) => {
        this.options = res.data
      })
      .catch(err => err)
  }
}
</script>

<style scoped></style>
