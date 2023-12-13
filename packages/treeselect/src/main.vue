<template>
  <div></div>
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
  name: 'XlTreeSelect',
  components: {}
})
export default class XlTreeSelect extends Vue {
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
}
</script>

<style scoped lang="scss"></style>
