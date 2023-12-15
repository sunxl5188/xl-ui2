<template>
  <div>
    <el-select
      v-model="value"
      filterable
      v-bind="{
        ...{
          placeholder: '请选择',
          'popper-class': 'mytree'
        }
      }"
    >
      <el-option :value="value" :label="value">
        <el-tree
          id="tree-option"
          ref="selectTree"
          :data="options"
          v-bind="{
            accordion: true,
            'empty-text': '暂无数据',
            'expand-on-click-node': true,
            'node-key': 'id',
            props: {
              label: 'label',
              children: 'children',
              disabled: 'disabled'
            }
          }"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Model,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component({
  name: 'XlTreeSelect',
  components: {}
})
export default class XlTreeSelect extends Vue {
  // prop ========================
  @Prop({
    type: String,
    default: ''
  })
  readonly attribute!: string
  // model =======================
  @Model('change', { type: String }) readonly value!: string

  // emit ========================

  @Emit('change')
  public handleChange(): string {
    return ''
  }

  // Watch ======================
  @Watch('value', { immediate: true, deep: true })
  public handleWatch(val: string) {}

  // data =========================

  options = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 2,
          label: '二级 1-1',
          children: [
            {
              id: 3,
              label: '三级 1-1-1'
            }
          ]
        }
      ]
    },
    {
      id: 4,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1',
          children: [
            {
              id: 6,
              label: '三级 2-1-1'
            }
          ]
        },
        {
          id: 7,
          label: '二级 2-2',
          children: [
            {
              id: 8,
              label: '三级 2-2-1'
            }
          ]
        }
      ]
    },
    {
      id: 9,
      label: '一级 3',
      children: [
        {
          id: 10,
          label: '二级 3-1',
          children: [
            {
              id: 11,
              label: '三级 3-1-1'
            }
          ]
        },
        {
          id: 12,
          label: '二级 3-2',
          children: [
            {
              id: 13,
              label: '三级 3-2-1'
            }
          ]
        }
      ]
    }
  ]

  //================================

  public handleNodeClick(data: any): void {
    if (!data.children) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">
.mytree {
  .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    overflow: hidden;
    overflow-y: auto;
    background: #fff;
    padding-left: 10px;
    padding-right: 10px;
    overflow-x: scroll;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
    & .el-tree {
      ::v-deep {
        .el-tree-node {
          & .el-tree-node__content {
            & .el-tree-node__label {
              font-weight: 400;
              font-size: 14px;
            }
          }
          & .el-tree-node__children {
          }
        }
      }
    }
  }
}
</style>
