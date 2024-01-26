<template>
  <div>
    <XlTable
      :sourceData="sourceData"
      :columns="columns"
      :total="total"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      :page-sizes="pageSizes"
      :table-attribute="{ 'max-height': 500 }"
      selection
      @change="handleChangePage"
      @selection-change="handleSelect"
    ></XlTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MyXlTable',
  components: {}
})
export default class extends Vue {
  sourceData = []
  columns = [
    {
      label: '序号',
      prop: 'idx'
    }
  ]
  currentPage = 1
  pageSize = 10
  total = 0
}
</script>

<style scoped></style>
