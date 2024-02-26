# xl-ui2

## UI 组件安装

```
pnpm install xl-ui2
```

### 组件引入

```
import xlui2 from 'xl-ui2';
import 'xl-ui2/lib/index.css';
Vue.use(xlui2, {
  codeApi: '/index/system/index/code/'码表接口地址
  storage: { 本地缓存配置
      prefix: 'xl-', //存储前缀
      expire: '1d', //过期时间，默认为一天;单位y年m月d日h小时min分钟s秒
      isEncrypt: true, //支持加密、解密数据处理
      SECRET_KEY: 'ccdde6e143439161', //加密的KEY,十六位十六进制数作为密钥
      SECRET_IV: 'aabbe7e3ba84431a' //加密的IV,十六位十六进制数作为密钥偏移量
  }
});
```

### 缓存调用

#### localStorage

```
this.$cache.local.set('KEY', 'OBJECT');设置值
this.$cache.local.setJSON('KEY', 'OBJECT');设置JSON值
this.$cache.local.get('KEY');获取值
this.$cache.local.getJSON('KEY');获取JSON值
this.$cache.local.remove('KEY');删除localStorage

```

---

#### sessionStorage

```
this.$cache.session.set('KEY', 'OBJECT');设置值
this.$cache.session.setJSON('KEY', 'OBJECT');设置JSON值
this.$cache.session.get('KEY');获取值
this.$cache.session.getJSON('KEY');获取JSON值
this.$cache.session.remove('KEY');删除sessionStorage
```

### 页面顶部搜索组件 XlHeaderSearch

```
<XlHeaderSearch
  ref="search"
  :formData="formData"
  :formItem="formItem"
  btnLast
  @search="handleSearch"
  @cancel="handleCancel"
/>
--------------------
绑定属性
formData //绑定的字段
formItem //表单数组
formAttribute //form属性
btnLast//按钮是否显示在后面
showRow//btnLast为false时显示多少行，默认一行
layout//row布局
---------------------
事件回调
search搜索事件回调
cancel清空事件回调
```

---

##### formItem 格试

```
formItem: [
  {
    label: '',标题
    prop: '',字段
    type: '',类型 input,select,radio,checkbox,tree,cascader,date,date2,switch,textarea,text
    formItemAttr: {},el-form-item属性
    attribute: {当前元素的属性:如input=>placeholder
      data: [],select,radio,checkbox,tree...数据
      code: '', select,radio,checkbox,tree...数据,如果设置了code, data无效
      props: { label: 'label', value: 'value' }自定义字段
    },
    events: {}事件
  },
  data2
  ------------------------
  {
    label: '',
    prop: 'time',
    type: 'date2',
    formItemAttr: {},
    attribute1: { type: 'date', 'value-format': 'yyyy-MM-dd', format: 'yyyy-MM-dd' },
    attribute2: { type: 'date', 'value-format': 'yyyy-MM-dd', format: 'yyyy-MM-dd' },
    events1: {},
    events2: {},
  },
]
```

### XlTable

```
<XlTable
  :load="load"
  :sourceData="sourceData"
  :columns="columns"
  :total="total"
  :currentPage.sync="currentPage"
  :pageSize.sync="pageSize"
  :selectable="handleSelectable"
  :tableAttribute="{}"
  @change="handleChangePage"
>
  <template #xxxx="{ row, index }"></template>
</XlTable>

```

---

```
sourceData: [],
columns: [
  {
    label: '序号',
    prop: 'idx',
  },
  {
    label: 'xxx',
    prop: '',
    customRender: '',
    attribute: {},
  }
],
currentPage: 1,
pageSize: 10,
total: 0
```

```
方法返回值用来决定这一行的 CheckBox radio 是否可以勾选
handleSelectable(row: any, index: number): boolean {
    if ([2, 5, 9].includes(index)) {
      return true //不禁用
    } else {
      return false //禁用
    }
}
清除选择
handleClearSelection()
表格重新渲染，加载数据
handleDoLayout()
```

### XlForm

```
<XlForm
ref="myform"
:form-data="formData"
:form-item="formItem"
:rules="rules"
:form-attribute="formAttribute"
:showButton="false"
@change="handleSaveForm" >
<div slot="customItem">22</div>
<template #customItem="{ row, form }">
<el-input
          v-model="form[row.prop]"
          placeholder="自定义输入框"
          clearable
        />
</template>
</XlForm>

```
