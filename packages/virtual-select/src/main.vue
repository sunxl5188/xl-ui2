<template>
  <div>
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

interface option {
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
  @Prop(Array) readonly listData!: option[] //所有数据

  id = ''
  elwarp: any = null
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

  created() {
    this.id = 'custom-' + this.uuid()
    this.sourceData = JSON.parse(JSON.stringify(this.listData))
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
      const select: any = this.$refs.list
      if (this.value) {
        const li = this.screenHeight / this.itemHeight
        const arg = select.multiple ? this.values[0] : this.values
        let start = this.listData.findIndex(o => o.value === arg)
        start = start > li ? start - 1 : 0
        this.start = start
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
  public handleVisiblechange(boole: boolean) {
    if (boole) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.elwarp.getElementsByClassName(
            'el-select-dropdown__wrap'
          )[0].scrollTop = this.start * this.itemHeight
        }, 100)
      })
    } else {
      if (this.isSearch) {
        this.sourceData = JSON.parse(JSON.stringify(this.listData))
        this.isSearch = false
      }
    }
  }
  public handleFilterMethod(query: string): void {
    if (query) {
      const data = this.listData.filter(o => o.label.indexOf(query) > -1)
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

  /**
   * @param {Number} len uuid的长度
   * @param {Boolean} firstU 将返回的首字母置为"u"
   * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
   */
  private uuid = (len = 32, firstU = true, radix = 0) => {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
      // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      let r
      // rfc4122标准要求返回的uuid中,某些位为固定的字符
      uuid[8] = '-'
      uuid[13] = '-'
      uuid[18] = '-'
      uuid[23] = '-'
      uuid[14] = '4'

      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
      uuid.shift()
      return `u${uuid.join('')}`
    }
    return uuid.join('')
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
