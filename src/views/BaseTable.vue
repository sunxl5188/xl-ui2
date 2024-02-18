<template>
  <div>
    <XlHeaderSearch
      ref="search"
      :formData="formData"
      :formItem="formItem"
      btnLast
      @search="handleSearch"
      @cancel="handleCancel"
    />
    <XlTable
      :sourceData="sourceData"
      :columns="columns"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      :table-attribute="{ 'max-height': 500 }"
      :total="total"
      selection="checkbox"
      @change="handleChangePage"
      @selection-change="handleSelect"
    >
      <template #action="{ row }">
        <el-button @click="handleEdit(row)">编辑</el-button>
        <el-button @click="handleDel(row)">删除</el-button>
      </template>
    </XlTable>
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
      attribute: { width: 500 }
    },
    {
      label: '更新时间',
      prop: 'addTime',
      customRender: '',
      attribute: { width: 500 }
    },
    {
      label: '操作',
      prop: '',
      customRender: 'action',
      attribute: {
        width: 200,
        align: 'center',
        fixed: 'right'
      }
    }
  ]
  currentPage = 1
  pageSize = 10
  total = 100
  tabkey = 0

  formData = {
    name: '',
    address: '',
    classId: '1'
  }
  formItem = [
    {
      label: '姓名',
      prop: 'name',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '地址',
      prop: 'address',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '分类',
      prop: 'classId',
      type: 'select',
      formItemAttr: {},
      attribute: { code: '2' }
    }
  ]

  mounted() {
    this.handleGenerate()
  }

  public handleGenerate(): void {
    this.sourceData = []
    let len = this.currentPage * this.pageSize + 1
    for (let i = len - this.pageSize; i < len; i++) {
      this.sourceData.push({
        id: i,
        name: '王小虎' + i,
        address: `上海市普陀区金沙江路 ${(Math.random() * 100000).toFixed(
          0
        )} 弄`,
        addTime: this.$dayjs()
          .add(i, 'day')
          .add(i + 2, 'hour')
          .add(i + 5, 'minute')
          .add(i + 8, 'second')
          .format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }

  //搜索
  public handleSearch(data: any): void {
    console.log(data)
  }
  //清除搜索
  public handleCancel(data: any): void {
    console.log('清除搜索', data)
  }

  public handleChangePage(page: pageType): void {
    console.log(page)
    this.handleGenerate()
  }
  public handleSelect(data: any): void {
    console.log(data)
  }
  //编辑
  public handleEdit({ id }: { id: number }): void {
    console.log(id)
  }
  //删除
  public handleDel({ id }: { id: number }): void {
    console.log(id)
  }
}
</script>

<style scoped></style>
