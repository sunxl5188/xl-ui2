<template>
  <div class="w-full flex justify-start items-center">
    <el-date-picker
      v-model="value1"
      v-bind="{ ...attribute, ...attributes }"
      @change="handleChange"
    />
    <span class="px-2 text-gray-400">{{ rangeSeparator }}</span>
    <el-date-picker
      v-model="value2"
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

  // model =======================
  @Model('change', { type: [String, Array] }) readonly value!: string | string[]

  // emit ========================

  @Emit('change')
  public handleChange(): string | string[] {
    return [this.value1, this.value2]
  }

  //data ====================
  value1 = ''
  value2 = ''

  attributes = {
    type: 'datetime',
    clearable: true,
    placeholder: '请选择日期',
    'value-format': 'yyyy-MM-dd HH:mm:ss',
    'default-time': this.$dayjs().format('HH:mm:ss'),
    'range-separator': '-'
  }

  get rangeSeparator(): string {
    const attrs = JSON.parse(JSON.stringify(this.attribute))
    const attr = { ...attrs, ...this.attributes }
    return attr['range-separator']
  }

  mounted() {
    this.$nextTick(() => {
      if (Object.prototype.toString.call(this.value) === '[object Array]') {
        this.value1 = this.value[0]
        this.value2 = this.value[1]
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
