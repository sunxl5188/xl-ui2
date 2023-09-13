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
      v-model="value"
      multiple
      filterable
      placeholder="请选择"
      style="width: 100%"
      popper-class="customSelect"
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
<script>
export default {
  name: 'XlSelect',
  components: {},
  props: {},
  data() {
    return {
      value: '',
      loading: false,
      listData: [],
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
      end: null
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
  watch: {},
  created() {
    for (let i = 1; i < 100000; i++) {
      this.listData.push({
        value: i,
        label: '黄金糕' + i
      })
    }
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
      const sel = document.getElementsByClassName('el-select-dropdown__list')[0]
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
    handleVisiblechange(boole) {
      if (boole) {
        const sel = document.getElementsByClassName(
          'el-select-dropdown__list'
        )[0]
        sel.style.transform = `translate3d(0,0,0)`
        this.start = 0
        this.computedVisibleData
      }
    },
    handleFilterMethod(query) {
      console.log(query)
    }
  }
}
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
