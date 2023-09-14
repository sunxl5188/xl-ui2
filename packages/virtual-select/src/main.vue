<template>
  <div>
    <el-select
      ref="list"
      v-model="value"
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
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'XlVirtualSelect111',
  components: {}
})
export default class XlVirtualSelect extends Vue {
  @Prop(Object) attribute!: object

  value = ''
  loading = false
  sourceData: any[] = [] //搜索时用到所有数据
  listData: any[] = [] //所有数据
  containerHeight = '100%'
  //每列高度
  itemHeight = 34
  //可视区域高度
  screenHeight = 274
  //偏移量
  startOffset = ''
  //起始索引
  start = 0
  //结束索引
  end = 10
  isSearch = false //是否输入搜索过

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
  //偏移量对应的style
  get computedGetTransform() {
    return `translate3d(0,${this.startOffset}px,0)`
  }
  created() {
    for (let i = 1; i < 100000; i++) {
      this.listData.push({
        value: i,
        label: '黄金糕' + i
      })
    }
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

  remoteMethod() {}
  scrollEvent(e: any) {
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
  handleInit() {
    this.start = 0 //列表开始索引
    this.end = this.start + this.computedVisibleCount //列表结束索引
    const scroll = document.getElementsByClassName(
      'el-select-dropdown__wrap'
    )[0]
    scroll.addEventListener('scroll', this.scrollEvent)
  }
  handleVisiblechange(boole: boolean) {
    if (boole) {
      const sel: any = document.getElementsByClassName(
        'el-select-dropdown__list'
      )[0]
      sel.style.transform = `translate3d(0,0,0)`
      this.start = 0
      this.computedVisibleData
    } else {
      if (this.isSearch) {
        this.listData = JSON.parse(JSON.stringify(this.sourceData))
        this.isSearch = false
      }
    }
  }
  handleFilterMethod(query: string) {
    if (query) {
      const data = this.sourceData.filter(o => o.label.indexOf(query) > -1)
      this.listData = data
      this.isSearch = true
    }
  }
}
/* export default {
  name: 'XlVirtualSelect',
  ,
  data() {
    return {
      value: '',
      loading: false,
      sourceData: [], //搜索时用到所有数据
      listData: [], //所有数据
      containerHeight: '100%',
      //每列高度
      itemHeight: 34,
      //可视区域高度
      screenHeight: 274,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
      isSearch: false //是否输入搜索过
    }
  },
  computed: {
    //获取真实显示列表数据
    computedVisibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      )
    },
    //列表总高度
    computedListHeight() {
      return BigInt(this.listData.length * this.itemHeight)
    },
    //可显示的列表项数
    computedVisibleCount() {
      return Math.ceil(this.screenHeight / this.itemHeight) + 1
    },
    //偏移量对应的style
    computedGetTransform() {
      return `translate3d(0,${this.startOffset}px,0)`
    }
  },
  created() {
    for (let i = 1; i < 100000; i++) {
      this.listData.push({
        value: i,
        label: '黄金糕' + i
      })
    }
    this.sourceData = JSON.parse(JSON.stringify(this.listData))
  },
  async mounted() {
    await this.$nextTick()
    const div = document.createElement('div')
    div.classList.add('listPhantom')
    div.style.height = this.computedListHeight + 'px'
    const el = document.getElementsByClassName('el-select-dropdown__wrap')[0]
    el.appendChild(div)
    this.handleInit()
  },
  methods: {
    remoteMethod() {},
    scrollEvent(e) {
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
    },
    //页面初始化
    handleInit() {
      this.start = 0 //列表开始索引
      this.end = this.start + this.computedVisibleCount //列表结束索引
      const scroll = document.getElementsByClassName(
        'el-select-dropdown__wrap'
      )[0]
      scroll.addEventListener('scroll', this.scrollEvent)
    },
    handleVisiblechange(boole: boolean) {
      if (boole) {
        const sel: any = document.getElementsByClassName(
          'el-select-dropdown__list'
        )[0]
        sel.style.transform = `translate3d(0,0,0)`
        this.start = 0
        this.computedVisibleData
      } else {
        if (this.isSearch) {
          this.listData = JSON.parse(JSON.stringify(this.sourceData))
          this.isSearch = false
        }
      }
    },
    handleFilterMethod(query: string) {
      if (query) {
        const data = this.sourceData.filter(o => o.label.indexOf(query) > -1)
        this.listData = data
        this.isSearch = true
      }
    }
  }
} */
</script>
<style lang="scss">
.customSelect {
  height: 260px;

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
