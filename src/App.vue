<template>
  <div>
    {{ formData }}
    <XlForm
      ref="myform"
      v-model="formData"
      :form-data="formData"
      :form-item="formItem"
      :rules="rules"
      :form-attribute="formAttribute"
    ></XlForm>
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
  labelArr = ''
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
  pageSize = 20
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

  checkArr = [
    {
      label: '备选项1',
      value: '1'
    },
    {
      label: '备选项2',
      value: '2'
    },
    {
      label: '备选项3',
      value: '3'
    },
    {
      label: '备选项4',
      value: '4'
    }
  ]

  formData = {
    name: '',
    a: [],
    radio: '',
    check: [],
    startTime: '',
    endTime: '',
    times: ['2023-10-10 08:00:00', '2023-12-20 12:23:00']
  }
  formItem = [
    {
      label: '姓名',
      prop: 'name',
      span: 8,
      formItemAttr: {},
      attribute: {
        placeholder: '请输入姓名'
      },
      events: {}
    },
    {
      label: '选择框',
      prop: 'a',
      type: 'select',
      span: 8,
      formItemAttr: {},
      attribute: {
        placeholder: '请选择产品',
        code: '2',
        multiple: true
      },
      events: {}
    },
    {
      label: '单选',
      prop: 'radio',
      type: 'radio',
      span: 8,
      formItemAttr: {},
      attribute: { data: this.checkArr, code: '3' }
    },
    {
      label: '多选',
      prop: 'check',
      type: 'check',
      span: 8,
      formItemAttr: {},
      attribute: { code: '1' }
    },
    {
      label: '即时配送',
      prop: 'delivery',
      type: 'switch',
      span: 8,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '活动形式',
      prop: 'desc',
      type: 'textarea',
      span: 24,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '地区',
      prop: 'addres',
      type: 'cascader',
      span: 8,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '日期',
      prop: 'startTime',
      prop2: 'endTime',
      type: 'date2',
      span: 8,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '日期',
      prop: 'times',
      type: 'date3',
      span: 8,
      formItemAttr: {},
      attribute: {}
    }
  ]
  formAttribute = {}
  rules = {}

  private created() {
    for (let i = 0; i < 20; i++) {
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
    console.log(page)
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
