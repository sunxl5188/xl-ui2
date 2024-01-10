<template>
  <div class="p-10">
    <XlCheckBox v-model="value" v-bind="attr" />
  </div>
</template>

<script lang="ts">
import XlCheckBox from '@/checkobx/src/main.vue'
import { Component, Vue } from 'vue-property-decorator'

// @ is an alias to /src

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  value = ['1']
  attr = {
    data: [
      {
        label: '区域一',
        value: '1'
      },
      {
        label: '区域二',
        value: '2'
      }
    ]
  }
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
