<template>
  <div>
    <!-- 
    multiple是否多选
    filterable是否可搜索
    remote是否为远程搜索
    allow-create是否允许用户创建新条目，需配合 filterable 使用
    reserve-keyword多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
    remote-method远程搜索方法
    loading是否正在从远程获取数据
    -->
    <el-select
      ref="list"
      v-model="values"
      :popper-class="'customSelect ' + id"
      v-bind="{
        ...{
          //multiple: true,
          clearable: true,
          'collapse-tags': true,
          filterable: true,
          placeholder: '请选择'
        },
        ...attribute
      }"
      v-on="events"
      :filter-method="handleFilterMethod"
      @visible-change="handleVisiblechange"
      @change="handleChange"
    >
      <el-option
        v-for="item in computedVisibleData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Model,
  Emit
} from 'vue-property-decorator'
import { getCode } from '@/utils/api'
import { uuid } from '@/utils/common'

interface optionType {
  label: string
  value: string
}

@Component({
  name: 'XlVirtualSelect',
  components: {}
})
export default class XlVirtualSelect extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  readonly attribute!: object

  @Prop({
    default() {
      return {}
    }
  })
  readonly events!: object

  @Prop(Array) readonly data!: optionType[] //所有数据

  @Prop({
    type: Object,
    default() {
      return {
        value: 'value',
        label: 'label'
      }
    }
  })
  readonly props!: optionType
  // code 字典表码-----------------------------
  @Prop({
    type: String,
    default: ''
  })
  readonly code!: string

  id = ''
  elwarp: any = null
  values: string | string[] = ''
  label: string | string[] = ''
  loading = false
  sourceData: any[] = [] //搜索时用到所有数据
  containerHeight = '100%'
  options: optionType[] = []
  //每列高度
  itemHeight = 34
  //可视区域高度
  screenHeight = 272
  //偏移量
  startOffset = ''
  //起始索引
  start = 0
  //结束索引
  end = 10
  isSearch = false //是否输入搜索过

  @Model('change', { type: String }) readonly value!: string

  @Watch('value', { immediate: true })
  onValueChanged(val: string) {
    setTimeout(() => {
      const select: any = this.$refs.list
      let data: string | string[] = []
      if (select.multiple) {
        if (val) {
          data = val.split(',')
        }
      } else {
        data = val || ''
      }
      this.values = data
      this.handleChange()
    }, 0)
  }

  //获取真实显示列表数据
  get computedVisibleData() {
    return this.sourceData.slice(
      this.start,
      Math.min(this.end, this.sourceData.length)
    )
  }
  //列表总高度
  get computedListHeight() {
    return BigInt(this.sourceData.length * this.itemHeight)
  }
  //可显示的列表项数
  get computedVisibleCount() {
    return Math.ceil(this.screenHeight / this.itemHeight) + 1
  }

  async created() {
    this.id = 'custom-' + uuid()
    if (this.data) {
      this.options = this.data
    }
    if (this.code) {
      const data = await this.getOption()
      this.options = data as []
    }
    this.sourceData = JSON.parse(JSON.stringify(this.options))
  }

  async mounted() {
    await this.$nextTick()
    const div = document.createElement('div')
    div.classList.add('listPhantom')
    div.style.height = this.computedListHeight + 'px'
    this.elwarp = document.getElementsByClassName(this.id)[0]
    const el = this.elwarp.getElementsByClassName('el-select-dropdown__wrap')[0]
    el.appendChild(div)
    this.handleInit()
  }

  private scrollEvent(e: any): void {
    //当前滚动位置
    let scrollTop = e.target.scrollTop
    //此时的开始索引
    this.start = Math.floor(scrollTop / this.itemHeight)
    //此时的结束索引
    this.end = this.start + this.computedVisibleCount
    //此时的偏移量
    this.startOffset = `translate3d(0,${
      scrollTop - (scrollTop % this.itemHeight)
    }px,0)`
    const sel: any = this.elwarp.getElementsByClassName(
      'el-select-dropdown__list'
    )[0]

    sel.style.transform = this.startOffset
  }
  //页面初始化
  private handleInit(): void {
    setTimeout(() => {
      if (this.value) {
        this.start = this.getStartPos()
      } else {
        this.start = 0 //列表开始索引
      }

      this.end = this.start + this.computedVisibleCount //列表结束索引
      const scroll = this.elwarp.getElementsByClassName(
        'el-select-dropdown__wrap'
      )[0]
      scroll.addEventListener('scroll', this.scrollEvent)
    }, 10)
  }
  // 下拉框出现/隐藏时触发
  public handleVisiblechange(boole: boolean) {
    if (boole) {
      this.$nextTick(() => {
        setTimeout(() => {
          let top = this.getStartPos() * this.itemHeight
          let wrap = this.elwarp.getElementsByClassName(
            'el-select-dropdown__wrap'
          )[0]
          wrap.scrollTop = top + 1
        }, 100)
      })
    } else {
      if (this.isSearch) {
        this.sourceData = JSON.parse(JSON.stringify(this.options))
        this.isSearch = false
      }
    }
  }
  private getStartPos(): number {
    let start = 0
    const li = this.screenHeight / this.itemHeight
    const select: any = this.$refs.list
    const arg = select.multiple ? this.values[0] : this.values
    let index = this.options.findIndex(o => o.value === arg) + 1
    if (index > li) {
      start = index - li + 2
    } else if (index === li) {
      start = 1
    } else {
      start = 0
    }
    return start
  }
  public handleFilterMethod(query: string): void {
    if (query) {
      const data = this.options.filter(o => o.label.indexOf(query) > -1)
      this.sourceData = data
      this.isSearch = true
    }
  }

  // Emit装饰器，表示下面的函数的结尾会派发一个事件
  // 如果Emit装饰器没有参数，则派发下面的函数名的kabeb-case，本例即update-count
  // 函数的return值会被当作emit的第一个额外参数派发
  // 函数的参数会被跟在第一个额外参数后面派发
  // 但是按原写法直接this.$emit也没什么问题

  @Emit('change')
  public handleChange(): string | string[] {
    setTimeout(() => {
      let lable
      const data = (this.$refs.list as any).selected
      if (Object.prototype.toString.call(data) === '[object Array]') {
        lable = data.map((item: any) => item.label)
        lable = lable.join(',')
      } else {
        lable = data.label
      }
      this.label = lable
    }, 0)
    let data = ''
    if (Object.prototype.toString.call(this.values) === '[object Array]') {
      data = (this.values as Array<string>).join(',')
    } else {
      data = this.values as string
    }
    return data
  }

  // 获取CODE这典
  getOption() {
    return new Promise((resolve, reject) => {
      getCode(this.$global.codeApi + this.code)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}
</script>
<style lang="scss">
.customSelect {
  height: 258px;

  .el-scrollbar {
    height: 100%;
    overflow-x: hidden;

    & .el-select-dropdown__wrap {
      &.el-scrollbar__wrap {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        .el-scrollbar__view {
          &.el-select-dropdown__list {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
