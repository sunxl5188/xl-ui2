<template>
  <div v-if="!hidden" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="page"
      :page-size="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { scrollTo } from '../../../src/utils/scroll-to'

@Component({
  name: 'XlPagination',
  components: {}
})
export default class XlPagination extends Vue {
  // prop ========================
  @Prop({
    type: Number,
    default: 0
  })
  readonly total!: number

  @Prop({
    type: Number,
    default: 1
  })
  readonly page!: number

  @Prop({
    type: Number,
    default: 20
  })
  readonly limit!: number

  @Prop({
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  })
  readonly pageSizes!: number[]

  @Prop({
    type: Number,
    default() {
      return document.body.clientWidth < 992 ? 5 : 7
    }
  })
  readonly pagerCount!: number

  @Prop({
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  })
  readonly layout!: string

  @Prop({
    type: Boolean,
    default: true
  })
  readonly background!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly autoScroll!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly hidden!: boolean

  // =======================

  // emit ========================

  @Emit('pagination')
  public handleSizeChange(val: number) {
    let page
    if (this.page * val > this.total) {
      page = 1
    } else {
      page = this.page
    }
    if (this.autoScroll) {
      scrollTo(0, 800)
    }

    return { currentPage: page, pageSize: val }
  }
  @Emit('pagination')
  public handleCurrentChange(val: number) {
    if (this.autoScroll) {
      scrollTo(0, 800)
    }

    return { currentPage: val, pageSize: this.limit }
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
</style>
