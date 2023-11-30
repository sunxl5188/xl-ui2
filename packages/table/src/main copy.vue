<template>
  <div>
    <el-table
      ref="myTable"
      v-loading="load"
      :data="sourceData"
      style="width: 100%"
      @selection-change="selectionChange"
      @sort-change="sortChange"
      v-bind="{
        ...{
          stripe: true,
          rowKey: 'id',
          border: true
        },
        ...tableAttribute
      }"
      v-on="{
        ...{},
        ...tableEvents
      }"
    >
      <!-- 选择 -->
      <el-table-column
        v-if="selection === 'check'"
        type="selection"
        reserve-selection
        width="55"
        align="center"
      />
      <el-table-column
        v-if="selection === 'radio'"
        label="选择"
        width="55"
        align="center"
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
      :page.sync="page"
      :limit.sync="limit"
      :page-sizes="pageSizes"
      :total="total"
      :hidden="pageHidden"
      @pagination="handleCurrentChange"
      :class="pageAlign"
    />
  </div>
</template>

<script>
export default {
  name: 'XlTable',
  props: {
    sourceData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    load: {
      type: Boolean,
      default: false
    },
    selection: {
      type: String,
      default: '' //check:多选 radio:单选
    },
    tableAttribute: {
      type: Object,
      default() {
        return {}
      }
    },
    tableEvents: {
      type: Object,
      default() {
        return {}
      }
    },
    // 分页
    // 分页总条数
    pageHidden: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40]
      }
    },
    pageAlign: {
      type: String,
      default: 'text-right'
    }
  },
  data() {
    return {
      selectData: []
    }
  },
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    limit: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    /**
     * @description: 设置表格翻页的序号递增
     * @param {*} index
     * @return {*}
     */
    indexMethod(index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize // 返回表格序号
    },
    // 当前页改变时会触发
    handleCurrentChange(page) {
      this.$emit('change', page)
    },
    // 选择行数据时触发
    selectionChange(row) {
      this.$emit('selection-change', row)
    },
    // 选择行数据时触发
    handleSelectionChange(row) {
      this.$emit('selection-change', row)
    },
    // 选择多行的选中状态
    toggleSelection(rows, selected = true) {
      if (rows) {
        rows.forEach(row => {
          const newArr = this.sourceData.filter(o => o === row)
          if (newArr.length) {
            this.$refs.myTable.toggleRowSelection(newArr[0], selected)
          }
        })
      } else {
        this.$refs.myTable.clearSelection()
      }
    },
    // 自定义排序，后端排序
    sortChange({ column, prop, order }) {
      this.$emit('sort-change', { prop, order: order || '' })
    },
    // 筛选
    handleFilterMethod(value, row, column) {
      const property = column['property']
      return row[property].toString() === value
    },
    // 重置表格布局
    doLayout() {
      this.$refs.myTable.doLayout()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-loading-mask {
    display: flex;
    justify-content: center;
    & .el-loading-spinner {
      width: auto;
    }
  }

  .el-radio {
    & .el-radio__label {
      width: 0;
      display: none;
    }
  }
}

.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
