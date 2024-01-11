<template>
  <div class="p-10">
    {{ value }}
    <XlTreeSelect v-model="value" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// @ is an alias to /src

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  value = null
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
