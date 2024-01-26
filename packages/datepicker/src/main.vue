<template>
  <div class="w-full flex justify-start items-center">
    <el-date-picker
      v-model="value1"
      :id="attribute.prop"
      v-bind="{
        ...attributes,
        ...{ 'picker-options': pickerOptions1 },
        ...attribute
      }"
      v-on="{}"
      @change="handleChangeDate1"
    />
    <span class="px-2 text-gray-400">{{ rangeSeparator }}</span>
    <el-date-picker
      v-model="value2"
      :disabled="!value[0]"
      v-bind="{
        ...attributes,
        ...{ 'picker-options': pickerOptions2 },
        ...attribute
      }"
      @change="handleChangeDate2"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Model,
  Emit,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

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
  readonly attribute!: any

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly events!: object

  // model =======================
  @Model('change', { type: [String, Array] }) readonly value!: string | string[]
  @Emit('change')
  public handleChange(): string | string[] {
    return [this.value1 || '', this.value2 || '']
  }

  //data ====================
  value1 = ''
  value2 = ''
  pickerOptions1 = {
    disabledDate: this.disabledDate1
  }
  pickerOptions2 = {
    disabledDate: this.disabledDate2
  }

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

  @Watch('value', { immediate: true })
  public handleWatch(val: Array<string>): void {
    if (Object.prototype.toString.call(val) === '[object Array]') {
      this.value1 = val[0] || ''
      this.value2 = val[1] || ''
    }
  }
  async mounted() {
    await this.$nextTick()
  }

  public handleChangeDate1(e: string) {
    if (e === null) {
      this.value2 = ''
    }
    this.value1 = e
    this.handleChange()
  }
  public handleChangeDate2(e: string) {
    this.value2 = e
    this.handleChange()
  }

  public disabledDate1(time: Date): boolean {
    let boole = false
    if (this.value2) {
      boole = time.getTime() >= new Date(this.value2).getTime()
    }
    return boole
  }

  public disabledDate2(time: Date): boolean {
    let boole = false
    let dayTime = 1000 * 60 * 60 * 24
    if (this.value1) {
      boole = new Date(this.value1).getTime() - dayTime >= time.getTime()
    }
    return boole
  }
}
</script>

<style scoped lang="scss"></style>
