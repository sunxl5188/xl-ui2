<template>
  <div class="flex justify-start items-center">
    <el-date-picker
      v-model="value1"
      type="date"
      v-bind="{ placeholder: '请选择日期' }"
    />
    <span class="px-1 text-gray-400">-</span>
    <el-time-picker
      v-model="value2"
      v-bind="{
        'picker-options': {
          selectableRange: '00:00:00 - 23:59:59',
          format: 'HH:mm:ss'
        },
        placeholder: '请选择时间',
        'default-value': new Date()
      }"
    />
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

@Component({
  name: 'XlDateTime',
  components: {}
})
export default class XlDateTime extends Vue {
  // prop ========================
  @Prop({
    type: String,
    default: ''
  })
  readonly attribute!: string
  // model =======================
  @Model('change', { type: String }) readonly value!: string

  // emit ========================

  @Emit('change')
  public handleChange(): string {
    return ''
  }

  // Watch ======================
  @Watch('value', { immediate: true, deep: true })
  public handleWatch(val: string) {}

  value1 = ''
  value2 = ''
}
</script>

<style scoped lang="scss"></style>
