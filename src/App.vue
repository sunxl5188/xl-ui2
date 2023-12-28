<template>
  <div class="p-10">
    <!--<XlTreeSelect v-model="value" :attribute="attribute"></XlTreeSelect>-->
    <!-- <XlTreeSelect /> -->
    <!--  <HeaderSearch :formItem="formItem1" :formData="formData1" /> -->
    {{ formData }}
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
import { Component, Vue } from 'vue-property-decorator'
import cache from '@/utils/cache'
import { encryptData, decryptData, encrypt, decrypt } from '@/utils/cryptojs'

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

  attribute = { data: this.data }

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
    gdbh: '',
    ssxq: '',
    gjsjArr: []
  }
  formItem1 = [
    {
      label: '国网工单编号',
      prop: 'gdbh',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '所属辖区',
      prop: 'ssxq',
      type: 'select',
      span: 6,
      formItemAttr: {},
      attribute: {
        data: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ]
      }
    },
    {
      label: '故障地址',
      prop: 'gzaddr',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单单位',
      prop: 'jddw',
      type: 'select',
      span: 6,
      formItemAttr: {},
      attribute: { code: '1' },
      events: {}
    },
    {
      label: '接单班组',
      prop: 'jdbz',
      type: 'check',
      span: 6,
      formItemAttr: {},
      attribute: { code: '5' }
    },
    {
      label: '抢修单状态',
      prop: 'qxdzt',
      type: 'radio',
      span: 6,
      formItemAttr: {},
      attribute: { code: '4' }
    },
    {
      label: '故障范围',
      prop: 'gzfw',
      type: 'date',
      span: 6,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '台区编号',
      prop: 'tqbh',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '台区名称',
      prop: 'tqmc',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '来源',
      prop: 'ly',
      type: 'select',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: { code: '8' }
    },
    {
      label: '是否启用先复',
      prop: 'xfdhqx',
      type: 'select',
      span: 6,

      formItemAttr: { class: 'label-word-wrap' },
      attribute: { props: { label: 'label', value: 'value' } }
    },
    {
      label: '联系电话',
      prop: 'lxdh',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '自动派工',
      prop: 'zdpg',
      type: 'select',
      span: 6,

      placeholder: '',
      formItemAttr: {},
      attribute: { props: { label: 'label', value: 'value' } }
    },
    {
      label: '终端接单状态',
      prop: 'isAppTakeOrder',
      type: 'select',
      span: 6,

      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '操作人',
      prop: 'clr',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单终端类型',
      prop: 'zdlx',
      type: 'select',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: { code: '28' }
    },
    {
      label: '所属馈线',
      prop: 'kxmc',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '抢修超时工单',
      prop: 'qxcs',
      type: 'select',
      span: 6,
      placeholder: '',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '到岗超时工单',
      prop: 'dgcs',
      type: 'select',
      span: 6,

      attribute: { props: { label: 'label', value: 'value' } },
      placeholder: '',
      formItemAttr: {}
    },
    {
      label: '挂机时间',
      prop: 'gjsjArr',
      type: 'date2',
      span: 10,
      placeholder: '',
      formItemAttr: {},
      attribute: {
        type: 'datetime',
        'default-time': ['09:00:00', '08:00:00'],
        'value-format': 'yyyyMMddHHmmss'
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

  mounted() {
    let a = encrypt(this.rules)
    console.log(a)
    let b = decrypt(a)
    console.log(b)
    let aa = encrypt('111111')
    console.log(aa)
    let bb = decrypt(aa)
    console.log(bb)
    let c = encryptData(this.rules, 'aa')
    console.log(c)
    let d = decryptData(c, 'aa')
    console.log(d)
  }

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
}
</script>

<style lang="scss" scoped></style>
