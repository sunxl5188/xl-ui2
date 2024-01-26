<template>
  <el-container style="width: 100%; height: 100%">
    <el-aside width="100px">
      <el-menu
        mode="vertical"
        default-active="MyXlForm"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100vh; overflow-y: auto; overflow-x: hidden"
        @select="handleSelected"
      >
        <el-menu-item index="MyXlForm">基础表单</el-menu-item>
        <el-menu-item index="MyXlTable">基础表格</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component :is="component"></component>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyXlForm from '@/views/BaseForm.vue'
import MyXlTable from '@/views/BaseTable.vue'

// @ is an alias to /src

@Component({
  name: 'App',
  components: { MyXlForm, MyXlTable }
})
export default class App extends Vue {
  component = 'MyXlForm'
  mounted() {}

  public handleSelected(e: string) {
    this.component = e
  }
}
</script>

<style lang="scss" scoped></style>
