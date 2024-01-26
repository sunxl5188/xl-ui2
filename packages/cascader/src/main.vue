<template>
  <div>
    <el-cascader
      ref="cascader"
      v-model="values"
      :options="options"
      :props="props"
      clearable
      v-bind="{
        ...{
          filterable: true
        },
        ...($attrs || {})
      }"
      v-on="events"
      @change="handleChange"
    ></el-cascader>
  </div>
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
import { city } from '@/utils/city'

@Component({
  name: 'XlCascader',
  components: {}
})
export default class XlCascader extends Vue {
  // prop ========================
  @Prop({
    type: Object,
    default() {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
        leaf: 'leaf'
      }
    }
  })
  readonly props!: object

  //绑定事件
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly events!: object

  // model =======================
  @Model('change', { type: [String, Array] }) readonly value!: string | []

  // emit ========================

  @Emit('change')
  handleChange(e: Array<string>) {
    let cascader = this.$refs.cascader as any
    let nodes = cascader.getCheckedNodes()
    if (nodes.length) {
      let { pathLabels } = nodes[0]
      if (pathLabels.length) {
        this.labels = pathLabels.join(',')
      } else {
        this.labels = ''
      }
    } else {
      this.labels = ''
    }
    this.$attrs.labelname && this.handleLabelName()
    return e
  }

  @Emit('update:labelName')
  public handleLabelName() {
    return this.labels
  }

  @Watch('value', { immediate: true })
  public handleWatch(val: string[] | string): void {
    this.values = JSON.parse(JSON.stringify(val || []))
  }

  // data ======================
  values = []
  labels = ''
  options = city

  async mounted() {
    await this.$nextTick()
    const data = (this.$attrs as any).data
    if (data) {
      this.options = data
    }
    if (this.values && this.values.length) {
      this.handleChange(this.values)
    }
  }
}
</script>

<style scoped lang="scss"></style>
