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
    <div class="py-4">
      <el-button type="primary" @click="handleClearSelect">清除选择</el-button>
      <el-button type="primary" @click="handleDoLayout">表格重新布局</el-button>
    </div>
    <XlTable
      ref="mytable"
      :sourceData="sourceData"
      :columns="columns"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      :table-attribute="{ 'max-height': 500 }"
      :total="total"
      selection="checkbox"
      :selectable="handleSelectable"
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
import type { PageType } from '../../packages/table'

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
    classId: '1',
    dates: []
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
    },
    {
      label: '日期',
      prop: 'dates',
      type: 'date2',
      formItemAttr: {},
      attribute1: { placeholder: '请选择开始时间' },
      attribute2: { placeholder: '请选择结束时间' },
      events1: { change: this.handleDate1 },
      events2: { change: this.handleDate2 }
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

  public handleChangePage(page: PageType): void {
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
  handleDate1(e: any) {
    console.log(e)
  }
  handleDate2(e: any) {
    console.log(e)
  }
  //表格重新渲染，加载数据
  handleDoLayout() {
    ;(this.$refs.mytable as any).handleDoLayout()
  }
  //清除选择
  handleClearSelect(e: any) {
    ;(this.$refs.mytable as any).handleClearSelection()
  }
  // 方法返回值用来决定这一行的 CheckBox 是否可以勾选
  public handleSelectable(row: any, index: number): boolean {
    if ([2, 5, 9].includes(index)) {
      return true //不禁用
    } else {
      return false //禁用
    }
  }
}
</script>
