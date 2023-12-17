<template>
  <div>
    <el-row>
      <template v-for="(item, index) in formItem">
        <el-col
          v-if="cloumnsNum(index) <= 48"
          :key="index"
          :span="item.span || 6"
        >
          {{ item.label }}
        </el-col>
        <div v-if="cloumnsOdd(index)" class="clearfix"></div>
      </template>
      <!-- 按钮 -->
      <el-col v-if="cloumnsTotal < 48" :span="48 - cloumnsTotal || 6">
        <slot name="button">
          <el-button type="primary" size="mini">搜索</el-button>
          <el-button size="mini">清空</el-button>
        </slot>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="collapse">
        <el-row>
          <template v-for="(item, index) in formItem">
            <el-col
              v-if="cloumnsNum(index) > 48"
              :key="index"
              :span="item.span || 6"
            >
              {{ item.label + '===' + cloumnsOdd(index) + '==--' + index }}
            </el-col>
            <div
              v-if="cloumnsOdd(index) && cloumnsNum(index) > 48"
              class="clearfix"
            ></div>
          </template>
        </el-row>
      </div>
    </el-collapse-transition>
    <div v-if="cloumnsTotal >= 48" class="flex justify-end items-center w-full">
      <slot name="button">
        <el-button type="primary" size="mini">搜索</el-button>
        <el-button size="mini">清空</el-button>
      </slot>
      <el-button
        v-if="cloumnsTotal > 48"
        type="text"
        size="mini"
        :icon="collapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        @click="collapse = !collapse"
      >
        {{ collapse ? '收起' : '展开' }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderSearch',
  components: {},
  props: {},
  data() {
    return {
      formItem: [
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
          placeholder: '',
          formItemAttr: {},
          attribute: { code: '35' }
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

          placeholder: '',
          formItemAttr: {},
          attribute: { props: { label: 'name', value: 'valXfleld1' } },
          events: { change: this.handleJddwChange }
        },
        {
          label: '接单班组',
          prop: 'jdbz',
          type: 'select',
          span: 6,

          placeholder: '',
          formItemAttr: {},
          attribute: {}
        },
        {
          label: '抢修单状态',
          prop: 'qxdzt',
          type: 'select',
          span: 6,
          placeholder: '',
          formItemAttr: {},
          attribute: { code: '29' }
        },
        {
          label: '故障范围',
          prop: 'gzfw',
          type: 'select',
          span: 6,

          placeholder: '',
          formItemAttr: {},
          attribute: { props: { label: 'label', value: 'value' } }
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
          label: '是否启用先复电后抢修',
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
          type: 'date',
          span: 10,
          placeholder: '',
          formItemAttr: {},
          attribute: {
            type: 'datetimerange',
            'default-time': ['08:00:00', '08:00:00'],
            'value-format': 'yyyyMMddHHmmss'
          }
        }
      ],
      collapse: false,
      formData: {},
      formAttribute: {},
      rules: {}
    }
  },
  watch: {},
  computed: {
    cloumnsNum() {
      return function (i) {
        let col = 0
        this.formItem.every((item, n) => {
          col += item.span || 6
          return i > n
        })
        return col
      }
    },
    cloumnsOdd() {
      return function (i) {
        let col = 0
        this.formItem.every((item, n) => {
          col += item.span || 6
          return i > n
        })
        return col % 24 === 0
      }
    },
    cloumnsTotal() {
      let total = 0
      this.formItem.forEach(item => {
        total += item.span || 6
      })
      return total
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
