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
  name: 'XlDatePicker3',
  components: {}
})
export default class XlDatePicker3 extends Vue {
  // prop ========================
  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly attribute!: object

  // model =======================
  @Model('change', { type: Array }) readonly value!: []

  // emit ========================

  @Emit('change')
  public handleChange(): string[] {
    return this.values
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
      this.values = this.value
    })
  }
}
</script>

<style scoped lang="scss"></style>
