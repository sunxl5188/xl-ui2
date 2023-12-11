<template>
  <div class="w-full flex justify-start items-center">
    <el-date-picker
      v-model="values[0]"
      v-bind="{ ...attribute, ...attributes }"
      @change="handleChange"
    />
    <span class="px-2 text-gray-400">{{ rangeSeparator }}</span>
    <el-date-picker
      v-model="values[1]"
      v-bind="{ ...attribute, ...attributes }"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'XlDatePicker2',
  components: {}
})
export default class XlDatePicker2 extends Vue {
  // prop ========================
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly attribute!: object

  @Prop({
    type: Array,
    default: ''
  })
  readonly prop!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly endTime!: string
  // model =======================
  @Model('change', { type: String }) readonly value!: string

  // emit ========================

  @Emit('change')
  public handleChange(): string {
    this.$emit(`update:${this.prop[1]}`, this.values[1] || '')
    return this.values[0] || ''
  }

  //data ====================
  values: string[] = []

  attributes = {
    type: 'datetime',
    clearable: true,
    placeholder: '请选择日期',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    'default-time': '08:00:00',
    'range-separator': '-'
  }

  get rangeSeparator(): string {
    const attrs = JSON.parse(JSON.stringify(this.attribute))
    const attr = { ...attrs, ...this.attributes }
    return attr['range-separator']
  }

  mounted() {
    this.$nextTick(() => {
      this.values = [this.value || '', this.endTime || '']
    })
  }
}
</script>

<style scoped lang="scss"></style>
