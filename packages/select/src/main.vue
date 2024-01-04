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
  readonly attribute!: any
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

  //回调
  @Model('change', { type: [String, Array] }) readonly value!: string | string[]

  @Emit('change')
  public handleChange(e: string | string[]): string | [] {
    let data
    if (e) {
      if (Object.prototype.toString.call(e) === '[object Array]') {
        data = this.options.filter((o: any) => {
          return e.includes(o[this.props['value']])
        })
        if (data.length) {
          let labArr = data.map(item => item[this.props.label])
          this.labels = labArr.join(',')
        }
      } else {
        data = this.options.filter((o: any) => {
          return o[this.props['value']] === e
        })
        if (data.length) {
          this.labels = data[0][this.props.label]
        }
      }
    } else {
      this.labels = ''
    }

    this.attribute.labelname && this.handleLabelName()
    return this.values
  }

  @Emit('labelname')
  public handleLabelName() {
    return {
      prop: this.attribute.labelname,
      data: this.labels
    }
  }

  // ---------------------
  mounted() {
    if (this.attribute.code) {
      this.getOption()
    } else if (this.attribute.data) {
      this.options = this.attribute.data
    }
  }
  // 获取CODE这典
  getOption() {
    getCode(this.$global.codeApi + this.attribute.code, this.$cache)
      .then((res: any) => {
        this.options = res.data
      })
      .catch(err => err)
  }
}
</script>

<style scoped></style>
