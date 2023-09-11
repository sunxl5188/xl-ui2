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
      v-model="value"
      multiple
      filterable
      allow-create
      remote
      reserve-keyword
      :loading="loading"
      :remote-method="remoteMethod"
      placeholder="请选择"
      style="width: 100%"
    >
      <el-option
        v-for="item in options"
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
      options: []
    }
  },
  watch: {},
  created() {
    for (let i = 1; i < 100; i++) {
      this.options.push({
        value: i,
        label: '黄金糕' + i
      })
    }
  },
  mounted() {},
  methods: {
    remoteMethod() {}
  }
}
</script>
<style lang="scss" scoped></style>
