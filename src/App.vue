<template>
  <div class="p-10">
    {{ formData1 }}
    <HeaderSearch
      v-model="formData1"
      :formItem="formItem1"
      :showRow="1"
      @search="handelSearch"
      @clear="handleClear"
    />

    <!-- <XlForm
      ref="myform"
      v-model="formData"
      :form-item="formItem"
      :rules="rules"
      :form-attribute="formAttribute"
      @change="handleSubmit"
    >
      <template #custom="{ row, form }">
        <el-form-item label="自定义">
          <el-input v-model="form[row.prop]" />
        </el-form-item>
      </template>
    </XlForm>
    <el-button type="primary" @click="handleSave">提交</el-button> -->
  </div>
</template>

<script lang="ts">
import XlCheckBox from '@/checkobx/src/main.vue'
import XlDatePicker2 from '@/datepicker'
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
  dates = []
  load = false
  checkvalue: string[] = []
  listData: option[] = []
  sourceData: object[] = []
  value = null
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
  data = [
    {
      id: '1',
      label: '一级 1',
      isNew: true,
      children: [
        {
          id: '11',
          label: '二级 1-1',
          isNew: true,
          children: [
            {
              id: '111',
              label: '三级 1-1-1',
              isNew: true
            }
          ]
        }
      ]
    },
    {
      id: '2',
      label: '一级 2',
      children: [
        {
          id: '22',
          label: '二级 2-1',
          children: [
            {
              id: '2221',
              label: '三级 2-1-1'
            }
          ]
        },
        {
          id: '222',
          label: '二级 2-2',
          children: [
            {
              id: '2222',
              label: '三级 2-2-1'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      label: '一级 3',
      children: [
        {
          id: '33',
          label: '二级 3-1',
          children: [
            {
              id: '333',
              label: '三级 3-1-1'
            }
          ]
        },
        {
          id: '3334',
          label: '二级 3-2',
          children: [
            {
              id: '3335',
              label: '三级 3-2-1'
            }
          ]
        }
      ]
    }
  ]

  isSf = [
    {
      label: '是',
      value: '1'
    },
    {
      label: '否',
      value: '0'
    }
  ]

  attribute = { data: this.data, slotname: ['option-label11'] }

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
    }
  ]

  formData = {
    name: '',
    a: '',
    radio: '',
    check: '',
    startTime: [],
    endTime: '',
    times: '',
    delivery: '',
    trees: null
  }
  formData1 = {
    gdbh: 'ppppp',
    ssxq: '',
    gjsjArr: [],
    jddw: '',
    jdbz: ''
  }
  formItem1 = [
    {
      label: '国网工单',
      prop: 'gdbh',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '所属辖区',
      prop: 'ssxq',
      type: 'select',
      formItemAttr: {},
      attribute: {
        data: this.isSf,
        labelname: 'ssxqname'
      }
    },
    {
      label: '故障地址',
      prop: 'gzaddr',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单单位',
      prop: 'jddw',
      type: 'select',
      formItemAttr: {},
      attribute: {
        data: this.checkArr
      },
      events: {}
    },
    {
      label: '接单班组',
      prop: 'jdbz',
      type: 'select',
      formItemAttr: {},
      attribute: { data: this.isSf }
    },
    {
      label: '抢修单状态',
      prop: 'qxdzt',
      type: 'select',
      formItemAttr: {},
      attribute: { data: this.isSf }
    },
    {
      label: '故障范围',
      prop: 'gzfw',
      type: 'date',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '台区编号',
      prop: 'tqbh',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '台区名称',
      prop: 'tqmc',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '来源',
      prop: 'ly',
      type: 'select',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '是否启用先复',
      prop: 'xfdhqx',
      type: 'select',
      formItemAttr: { class: 'label-word-wrap' },
      attribute: {
        data: this.options,
        props: { label: 'label', value: 'value' }
      }
    },
    {
      label: '联系电话',
      prop: 'lxdh',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '自动派工',
      prop: 'zdpg',
      type: 'select',
      placeholder: '',
      formItemAttr: {},
      attribute: {
        data: this.options,
        props: { label: 'label', value: 'value' }
      }
    },
    {
      label: '终端接单状态',
      prop: 'isAppTakeOrder',
      type: 'select',
      placeholder: '',
      formItemAttr: {},
      attribute: { data: this.options }
    },
    {
      label: '操作人',
      prop: 'clr',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单终端类型',
      prop: 'zdlx',
      type: 'select',
      placeholder: '',
      formItemAttr: {},
      attribute: { data: this.options }
    },
    {
      label: '所属馈线',
      prop: 'kxmc',
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '抢修超时工单',
      prop: 'qxcs',
      type: 'select',
      placeholder: '',
      formItemAttr: {},
      attribute: { data: this.options }
    },
    {
      label: '到岗超时工单',
      prop: 'dgcs',
      type: 'select',
      attribute: {
        data: this.options,
        props: { label: 'label', value: 'value' }
      },
      placeholder: '',
      formItemAttr: {}
    },
    {
      label: '挂机时间',
      prop: 'gjsjArr',
      type: 'date2',
      span: 12,
      placeholder: '',
      formItemAttr: {},
      attribute: {},
      events: {
        change: this.handleChangeDate
      }
    }
  ]
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
        data: this.checkArr,
        multiple: true,
        labelname: 'aName'
      },
      events: {}
    },
    {
      label: '单选',
      prop: 'radio',
      type: 'radio',
      span: 8,
      formItemAttr: {},
      attribute: { code: '3', labelname: 'bName' }
    },
    {
      label: '多选',
      prop: 'check',
      type: 'check',
      span: 8,
      formItemAttr: {},
      attribute: { code: '3', labelname: 'bbName' }
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
      type: 'date2',
      span: 8,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '日期',
      prop: 'times',
      type: 'date',
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
      label: '自定义',
      prop: 'custom',
      slotname: 'custom',
      span: 24,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '树',
      prop: 'trees',
      type: 'tree',
      span: 24,
      formItemAttr: {},
      attribute: {
        data: this.data,
        multiple: true
      }
    }
  ]
  formAttribute = {}
  rules = {
    name: [{ required: true, message: '请输入' }]
  }

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
  public handleSave(): void {
    ;(this.$refs.myform as any).handleSubmit()
  }
  public handleSubmit(data: any, label: any): void {
    console.log(data)
    console.log(label)
  }
  handelSearch(data: object) {
    console.log(data, '=====')
  }
  handleClear(data: object) {
    console.log(data, '清空并搜索=====')
  }
  handleChangeDate(data: object) {
    console.log(data, '=====')
  }
}
</script>

<style lang="scss" scoped></style>
