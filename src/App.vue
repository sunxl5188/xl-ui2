<template>
  <div>
    <xl-select></xl-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// @ is an alias to /src
interface sourceDataProps {
  id: number
  title: string
}

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  sourceData: object[] = []
  columns = [
    {
      label: '标题',
      prop: 'name',
      attribute: { sortable: true }
    },
    {
      label: '日期',
      prop: 'date',
      attribute: { sortable: 'custom' }
    },
    {
      label: '地址',
      prop: 'address',
      attribute: { sortable: true }
    }
  ]
  currentPage = 1
  total = 100
  pageSize = 10
  tableAttribute = {
    //'default-sort': { prop: 'date', order: 'descending' }
  }

  private created() {
    for (let i = 0; i < 10; i++) {
      this.sourceData.push({
        id: i,
        date: (this as any).$dayjs().add(i, 'day').format('YYYY-MM-DD'),
        name: '王小虎' + i,
        address: '上海市普陀区金沙江路 1518 弄' + i
      })
    }
  }

  mounted() {}

  public handleChangePage(page: object): void {
    console.log(page, this.currentPage)
  }

  public handleSelect(): void {}
}
</script>

<style lang="scss"></style>
