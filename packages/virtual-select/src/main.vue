<template>
  <div>
    <el-select
      ref="list"
      v-model="values"
      popper-class="customSelect"
      v-bind="{
        ...{
          multiple: true,
          clearable: true,
          'collapse-tags': true,
          filterable: true,
          placeholder: '请选择'
        },
        ...attribute
      }"
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

interface option {
  label: string
  value: string
}

@Component({
  name: 'XlVirtualSelect',
  components: {}
})
export default class XlVirtualSelect extends Vue {
  @Prop(Object) attribute!: object
  @Prop(Array) listData!: option[] //所有数据

  values: string | string[] = ''
  label: string | string[] = ''
  loading = false
  sourceData: any[] = [] //搜索时用到所有数据
  containerHeight = '100%'
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
    return this.listData.slice(
      this.start,
      Math.min(this.end, this.listData.length)
    )
  }
  //列表总高度
  get computedListHeight() {
    return BigInt(this.listData.length * this.itemHeight)
  }
  //可显示的列表项数
  get computedVisibleCount() {
    return Math.ceil(this.screenHeight / this.itemHeight) + 1
  }

  created() {
    this.sourceData = JSON.parse(JSON.stringify(this.listData))
  }

  mounted() {
    const div = document.createElement('div')
    div.classList.add('listPhantom')
    div.style.height = this.computedListHeight + 'px'
    const el = document.getElementsByClassName('el-select-dropdown__wrap')[0]
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
    const sel: any = document.getElementsByClassName(
      'el-select-dropdown__list'
    )[0]
    sel.style.transform = this.startOffset
  }
  //页面初始化
  private handleInit(): void {
    if (this.value) {
      const li = this.screenHeight / this.itemHeight
      let start = this.listData.findIndex(o => o.value === this.values[0])
      start = start > li ? start - 1 : 0
      this.start = start
    } else {
      this.start = 0 //列表开始索引
    }

    this.end = this.start + this.computedVisibleCount //列表结束索引
    const scroll = document.getElementsByClassName(
      'el-select-dropdown__wrap'
    )[0]
    scroll.addEventListener('scroll', this.scrollEvent)
  }
  public handleVisiblechange(boole: boolean) {
    if (boole) {
      this.$nextTick(() => {
        const el = document.getElementsByClassName(
          'el-select-dropdown__wrap'
        )[0]
        setTimeout(() => {
          el.scrollTop = this.start * this.itemHeight
        }, 0)
      })
    } else {
      if (this.isSearch) {
        this.listData = JSON.parse(JSON.stringify(this.sourceData))
        this.isSearch = false
      }
    }
  }
  public handleFilterMethod(query: string): void {
    if (query) {
      const data = this.sourceData.filter(o => o.label.indexOf(query) > -1)
      this.listData = data
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
}
</script>
<style lang="scss">
.customSelect {
  height: 258px;

  .el-scrollbar {
    & .el-select-dropdown__wrap {
      &.el-scrollbar__wrap {
        position: relative;
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
