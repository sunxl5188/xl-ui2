<template>
  <div>
    <el-table
      ref="myTable"
      v-loading="load"
      :data="sourceData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="{
        ...{
          stripe: false,
          rowKey: 'id',
          border: true
        },
        ...tableAttribute
      }"
      v-on="{
        ...{},
        ...events
      }"
    >
      <!-- 选择 -->
      <el-table-column
        v-if="selection === 'checkbox'"
        v-bind="{
          type: 'selection',
          'reserve-selection': true,
          width: '55',
          align: 'center'
        }"
      />
      <el-table-column
        v-if="selection === 'radio'"
        v-bind="{
          label: '选择',
          width: '55',
          align: 'center'
        }"
      >
        <template #default="{ row }">
          <el-radio
            v-model="selectData"
            :label="row"
            @change="handleSelectionChange"
          ></el-radio>
        </template>
      </el-table-column>
      <template v-for="(item, index) of columns">
        <!-- 序号 -->
        <el-table-column
          v-if="item.prop === 'idx'"
          :key="index + 'index'"
          :label="item.label"
          type="index"
          :index="indexMethod"
          v-bind="{
            ...{
              width: 70,
              align: 'center'
            },
            ...(item.attribute || {})
          }"
        ></el-table-column>
        <!-- 其它字段 -->
        <el-table-column
          v-else
          :key="index + 'prop'"
          :column-key="item.prop"
          :label="item.label"
          :prop="item.prop"
          v-bind="{
            ...{},
            ...(item.attribute || {})
          }"
        >
          <template v-if="item.customRender" #default="scope">
            <slot
              :name="item.customRender"
              :row="scope.row"
              :index="scope.$index"
            >
              <!-- --插槽内容-- -->
            </slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <div v-if="!load" class="py-4">
          <div class="leading-7">暂无相关数据</div>
        </div>
      </template>
    </el-table>
    <xl-pagination
      :page="currentPage"
      :limit="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      :hidden="pageHidden"
      :class="pageAlign"
      @pagination="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Prop, Vue } from 'vue-property-decorator'

interface ColumnType {
  label: string
  prop: string
  customRender?: string
  attribute?: object
  events?: object
}

@Component({
  name: 'XlTable',
  components: {}
})
export default class XlTable extends Vue {
  // prop ========================
  @Prop({ type: Object, default: () => {} })
  readonly tableAttribute!: object

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly attribute!: object

  @Prop({
    type: Object,
    default() {
      return {}
    }
  })
  readonly events!: object

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly sourceData!: any[]

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  readonly columns!: ColumnType[]

  @Prop({
    type: Boolean,
    default: false
  })
  readonly load!: boolean

  @Prop({
    type: String,
    default: ''
  })
  readonly selection!: string // checkbox:多选 radio:单选

  @Prop({
    type: Number,
    default: 0
  })
  readonly total!: number // 分页总条数

  @Prop({
    type: Number,
    default: 0
  })
  readonly currentPage!: number // 当前页

  @Prop({
    type: Number,
    default: 10
  })
  readonly pageSize!: number // 每页大小

  @Prop({
    type: Array,
    default() {
      return [10, 20, 30, 40, 50, 100]
    }
  })
  readonly pageSizes!: number[] // 每页显示个数选择器的选项设置

  @Prop({
    type: String,
    default: 'sizes, prev, pager, next, jumper, ->, total'
  })
  readonly layout!: string // 每页显示个数选择器的选项设置

  @Prop({
    type: String,
    default: 'right'
  })
  readonly pageAlign!: string // 分页对齐方式

  @Prop({
    type: Boolean,
    default: false
  })
  readonly pageHidden!: boolean // 是否显示分页

  // model =======================
  @Model('change', { type: String }) readonly value!: string

  // emit ========================

  //选择数据时回调
  @Emit('selection-change')
  public handleSelectionChange(data: object | object[]): object | object[] {
    return data
  }

  //分页发生变化时
  @Emit('change')
  public handleCurrentChange(page: {
    currentPage: number
    pageSize: number
  }): object {
    this.$emit('update:currentPage', page.currentPage)
    this.$emit('update:pageSize', page.pageSize)
    return page
  }

  // data=======================
  selectData: string | object | Array<object> = ''

  /**
   * @description: 设置表格翻页的序号递增
   * @param {*} index
   * @return {*}
   */
  public indexMethod(index: number): number {
    return index + 1 + (this.currentPage - 1) * this.pageSize // 返回表格序号
  }
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-radio {
    & .el-radio__label {
      width: 0;
      display: none;
    }
  }
  .el-table th {
    &.el-table__cell {
      background: var(--header-table-cell);
    }
  }
}

.left {
  text-align: left;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
</style>
