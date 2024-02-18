<template>
  <div>
    <XlTable
      :sourceData="sourceData"
      :columns="columns"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      :table-attribute="{ 'max-height': 500 }"
      :tabkey="tabkey"
      selection="checkbox"
      @change="handleChangePage"
      @selection-change="handleSelect"
    ></XlTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { pageType } from '../../packages/table'

@Component({
  name: 'MyXlTable',
  components: {}
})
export default class extends Vue {
  sourceData: any[] = []
  columns = [
    {
      label: '序号',
      prop: 'idx'
    },
    {
      label: '姓名',
      prop: 'name',
      customRender: '',
      attribute: {}
    },
    {
      label: '地址',
      prop: 'address',
      customRender: '',
      attribute: {}
    },
    {
      label: '更新时间',
      prop: 'addTime',
      customRender: '',
      attribute: {}
    },
    {
      label: '字段一',
      prop: 'adds',
      customRender: '',
      attribute: {}
    }
  ]
  currentPage = 1
  pageSize = 10
  total = 100
  tabkey = 0

  mounted() {
    this.handleGenerate()
  }

  public handleGenerate(): void {
    this.sourceData = []
    let len = this.currentPage * this.pageSize + 1
    for (let i = len - this.pageSize; i < len; i++) {
      this.sourceData.push({
        name: '王小虎' + i,
        address: `上海市普陀区金沙江路 ${(Math.random() * 100000).toFixed(
          0
        )} 弄`,
        addTime: this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }
    this.sourceData.map((item, i) => (item.adds = i))
  }

  public handleChangePage(page: pageType): void {
    console.log(page)

    this.handleGenerate()
  }
  public handleSelect(data: any): void {
    console.log(data)
  }
}
</script>

<style scoped></style>
