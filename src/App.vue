<template>
  <div>
    <!-- <XlCheckBox
      v-model="checkvalue"
      isAll
      v-bind="{ code: '2', data: options, direction: 'horizontal' }"
    /> -->
    <!-- <div v-code="{ options: '3', cache: true }">11111</div> -->
    <!-- <XlSelect
      v-model="value"
      v-bind="{
        code: '1',
        abc: '1111'
        //data: options
      }"
    ></XlSelect> -->
    <XlTable
      :load="load"
      :sourceData="sourceData"
      :columns="columns"
      :total="total"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      selection="radio"
      @change="handleChangePage"
      @selection-change="handleSelect"
    ></XlTable>
    <!-- <XlVirtualSelect
      ref="vir"
      v-model="value"
      v-bind="{
        code: '1',
        data: listData
      }"
    ></XlVirtualSelect> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// @ is an alias to /src
interface sourceDataProps {
  id: number
  title: string
}
interface option {
  label: string
  value: string
}
@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  load = false
  checkvalue: string[] = []
  listData: option[] = []
  sourceData: object[] = []
  value = '0598'
  value1 = '10'
  label = ''
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

  options = [
    {
      value: '1',
      label: '黄金糕'
    },
    {
      value: '2',
      label: '双皮奶'
    },
    {
      value: '3',
      label: '蚵仔煎'
    },
    {
      value: '4',
      label: '龙须面'
    },
    {
      value: '5',
      label: '北京烤鸭'
    },
    {
      value: '6',
      label: '黄金糕'
    },
    {
      value: '7',
      label: '双皮奶'
    },
    {
      value: '8',
      label: '蚵仔煎'
    },
    {
      value: '9',
      label: '龙须面'
    },
    {
      value: '10',
      label: '北京烤鸭'
    },
    {
      value: '11',
      label: '北京烤鸭'
    }
  ]

  private created() {
    for (let i = 0; i < 10; i++) {
      this.sourceData.push({
        id: i,
        date: (this as any).$dayjs().add(i, 'day').format('YYYY-MM-DD'),
        name: '王小虎' + i,
        address: '上海市普陀区金沙江路 1518 弄' + i
      })
    }
    for (let i = 1; i < 100000; i++) {
      this.listData.push({
        value: i.toString(),
        label: '黄金糕' + i
      })
    }
  }

  mounted() {}

  public handleChangePage(page: object): void {
    console.log(page, this.currentPage)
  }

  public handleSelect(e: any): void {
    console.log(e)
  }

  public handleSpeach(): void {
    ;(this.$refs.speach as any).handleSpeech()
  }
}
</script>

<style lang="scss" scoped></style>
