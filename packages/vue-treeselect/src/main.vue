<template>
  <div style="line-height: normal">
    <Treeselect
      ref="mytree"
      v-model="values"
      :options="attribute.data"
      v-bind="{ ...defAttribute, ...attribute }"
      v-on="{
        input: handleInput
      }"
      :class="size"
    >
      <!-- 选中的值 -->
      <div slot="value-label" slot-scope="{ node }">
        <slot
          v-if="
            attribute.slotname && attribute.slotname.includes('value-label')
          "
          name="value-label"
          :node="node"
        >
          插槽内容
        </slot>
        <template v-else>{{ node.raw.label }}</template>
      </div>
      <!-- 下拉列表 -->
      <div
        slot="option-label"
        slot-scope="{
          node,
          shouldShowCount,
          count,
          labelClassName,
          countClassName
        }"
      >
        <slot
          v-if="
            attribute.slotname && attribute.slotname.includes('option-label')
          "
          name="option-label"
          :node="node"
          :shouldShowCount="shouldShowCount"
          :count="count"
          :labelClassName="labelClassName"
          :countClassName="countClassName"
        >
          插槽内容
        </slot>
        <template v-else>{{ node.label }}</template>
      </div>
      <div slot="before-list">
        <slot name="before-list"></slot>
      </div>
      <div slot="after-list">
        <slot name="after-list"></slot>
      </div>
    </Treeselect>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

/**
 * //数据结构
      node: {
        id: '', //用于识别树中的选项。它的值在所有选项中都必须是唯一的
        label: '', //用于显示选项
        children: [], //子级数据
        isDisabled: false, //用于禁用项目选择
        isNew: true, //用于为新节点赋予不同的颜色
        isDefaultExpanded: true //默认情况下是否应展开此文件夹选项
      },
 * 事件
 *  events: {
        open: instanceId => {}, //当菜单打开时发出
        close: (value, instanceId) => {}, //当菜单关闭时发出
        input: (value, instanceId) => {}, //值更改后发出
        select: (node, instanceId) => {}, //选择选项后发出
        deselect: (node, instanceId) => {}, //取消选择选项后发出
        'search-change': (searchQuery, instanceId) => {} //在搜索查询更改后发出
      },

 * slots:{
      自定义选项标签模板的插槽。有关详细信息，请参阅此处
      option-label:{node, shouldShowCount, count, labelClassName, countClassName}
      自定义值标签模板的插槽。
      value-label	{node}
      显示在菜单列表之前的插槽
      before-list
      菜单列表后显示的插槽
      after-list
    }
 */
export default {
  name: 'XlTreeSelect',
  components: { Treeselect },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    attribute: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Number, Array],
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      values: null,
      labels: '',
      defAttribute: {
        name: 'MyTreeSelect',
        allowClearingDisabled: false, //即使有禁用的选定节点，是否允许重置值
        allowSelectingDisabledDescendants: false, //选择/取消选择祖先节点时，是否应选择/取消选中其禁用的子节点。您可能希望将其与allowClearingDisabled道具一起使用
        alwaysOpen: false, //菜单是否应始终打开
        appendToBody: true, //将菜单附加到＜body＞
        async: false, //是否启用异步搜索模式
        autoFocus: false, //自动将组件集中在装载上
        autoLoadRootOptions: true, //装载时自动加载根选项。设置为false时，打开菜单时将加载根选项
        autoDeselectAncestors: false, //当用户取消选择节点时，会自动取消选择其祖先。仅适用于平面模式
        autoDeselectDescendants: false, //当用户取消选择节点时，会自动取消选择其子节点。仅适用于平面模式
        autoSelectAncestors: false, //当用户选择一个节点时，会自动选择其祖先。仅适用于平面模式
        autoSelectDescendants: false, //当用户选择一个节点时，会自动选择其子节点。仅适用于平面模式
        backspaceRemoves: true, //如果没有文本输入，Backspace是否删除最后一项
        beforeClearAll: () => true, //在清除所有输入字段之前进行处理的函数。返回false以停止清除值
        branchNodesFirst: false, //在叶节点之前显示分支节点
        cacheOptions: true, //是否缓存异步搜索模式下每个搜索请求的结果
        clearable: true, //是否显示重置值的“×”按钮
        clearAllText: '清除所有', //当：multiple=“true”时，“×”按钮的标题
        clearOnSelect: false, //选择选项后是否清除搜索输入。仅在以下情况下使用：multiple=“true”。对于单选模式，无论道具值如何，它总是在选择后清除输入
        defaultExpandLevel: 0, //加载时应自动展开多少级别的分支节点。设置“无限”以使所有分支节点在默认情况下展开
        defaultOptions: false, //在用户开始搜索之前显示的默认选项集。用于异步搜索模式。当设置为true时，将自动加载作为空字符串的搜索查询结果
        deleteRemoves: true, //如果没有文本输入，是否删除最后一项
        delimiter: ',', //用于连接隐藏字段值的多个值的分隔符
        flattenSearchResults: false, //搜索时是否展开树（仅限同步搜索模式）
        disableBranchNodes: true, //是否阻止选择分支节点,只选择子级
        disabled: false, //是否禁用控制
        disableFuzzyMatching: false, //设置为true可禁用默认情况下启用的模糊匹配功能
        flat: false, //是否启用平面模式
        instanceId: '10$$', //将以所有事件作为最后一个参数进行传递。有助于识别事件来源
        joinValues: false, //使用分隔符将多个值合并到单个表单字段中（传统模式）
        limit: Infinity, //多选时最多显示个数 default Infinity
        limitText: count => `+${count}`, //当所选元素超过定义的限制时，处理显示的消息的函数
        loadingText: '加载中...', //加载选项时显示的文本
        loadOptions: undefined, //用于动态加载选项
        matchKeys: ['label'], //要筛选的节点对象的哪些键
        maxHeight: 200, //设置菜单的最大高度样式值
        multiple: false, //是否多选
        placeholder: '请选择',
        noOptionsText: '暂无数据', //没有可用选项时显示的文本
        noChildrenText: '暂无子级', //分支节点没有子节点时显示的文本
        noResultsText: '未找到结果', //没有匹配的搜索结果时显示的文本
        normalizer: node => node, //用于规范化源数据
        openDirection: 'auto', //默认情况下（“自动”），菜单将在控件下方打开。如果没有足够的空间，vue-treeselect将自动翻转菜单。您可以使用其他四个选项中的一个来强制菜单始终按指定方向打开。 "auto", "below", "bottom", "above" or "top"
        openOnClick: true, //单击控件时是否自动打开菜单
        openOnFocus: false, //控件聚焦时是否自动打开菜单
        required: false, //需要时应用HTML5必需的属性
        retryText: '是否重试？', //显示的文本询问用户是否重试加载子选项
        retryTitle: '单击重试', //重试按钮的标题
        searchable: true, //是否启用搜索功能
        searchNested: false, //如果搜索查询也应在所有祖先节点中搜索，则设置true
        searchPromptText: '要搜索的类型', //提示异步搜索的文本提示。用于异步搜索模式
        showCount: false, //是否在每个分支节点的标签旁边显示子计数
        showCountOf: 'ALL_CHILDREN', //与showCount一起使用，指定应显示的计数类型。"ALL_CHILDREN", "ALL_DESCENDANTS", "LEAF_CHILDREN" or "LEAF_DESCENDANTS"
        showCountOnSearch: undefined, //搜索时是否显示子项计数。未指定时回退到showCount的值
        sortValueBy: 'LEVEL', //所选选项应按哪个顺序显示在触发器中并按值数组排序。仅在以下情况下使用：multiple=“true”,"ORDER_SELECTED", "LEVEL" or "INDEX"
        tabIndex: 0, //控件的选项卡索引
        valueConsistsOf: 'BRANCH_PRIORITY', //在多选模式下，值数组中应包括哪种节点,"ALL", "BRANCH_PRIORITY", "LEAF_PRIORITY" or "ALL_WITH_INDETERMINATE"
        valueFormat: 'id', //值道具的格式。请注意，当设置为“object”时，在值中的每个节点对象中只需要id和label属性。可接受的值：“id”或“object”
        zIndex: 999
      },
      size: 'medium'
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.values = val || null
      },
      immediate: true
    }
  },
  mounted() {
    this.size = (this.$ELEMENT && this.$ELEMENT.size) || 'medium'
  },
  methods: {
    handleInput() {
      const data = this.$refs.mytree.selectedNodes
      const labels = data.map(item => item.label)
      this.labels = labels
      this.$emit('change', this.values || '')
      this.$emit('labelname', {
        prop: this.attribute.prop,
        data: this.labels.join(',')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
