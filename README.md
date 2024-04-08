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

#### XlForm 参数

```
formData = {
    custom: '',
    org: '111111',
    jddw: '0592',
    ifjt: '1',
    source: ['1'],
    kpr: '1-2',
    address: ['350000', '350200', '350211'],
    gdsj: '2020-12-20 08:00:20',
    jdsj: '',
    fdsj: ['2020-12-20 08:00:20', '2024-01-25 00:00:00'],
    isgd: '1',
    text: '123456',
    check: ['2']
  }
  formItem = [
    {
      label: '插槽',
      prop: 'custom',
      slotname: 'customItem',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '工单编号',
      prop: 'org',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单单位',
      prop: 'jddw',
      type: 'select',
      formItemAttr: {},
      attribute: { labelname: 'jddwName', code: '1' }
    },
    {
      label: '是否接通',
      prop: 'ifjt',
      type: 'radio',
      formItemAttr: {},
      attribute: { labelname: 'sfjtName', code: '4' }
    },
    {
      label: '开票人',
      prop: 'kpr',
      type: 'tree',
      formItemAttr: {},
      attribute: { labelname: 'kprName' }
    },
    {
      label: '故障地址',
      prop: 'address',
      type: 'cascader',
      formItemAttr: {},
      attribute: { labelname: 'addressName' }
    },
    {
      label: '故障时间',
      prop: 'gdsj',
      type: 'date',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '接单时间',
      prop: 'jdsj',
      type: 'datetime',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '是否归档',
      prop: 'isgd',
      type: 'switch',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '文本',
      prop: 'text',
      type: 'text',
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '复电时间',
      prop: 'fdsj',
      type: 'date2',
      span: 12,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '来源',
      prop: 'source',
      span: 12,
      type: 'checkbox',
      formItemAttr: {},
      attribute: { labelname: 'sourceName', code: '9' }
    },
    {
      label: '多选框',
      prop: 'check',
      type: 'checkbox',
      span: 12,
      formItemAttr: {},
      attribute: { code: '2' }
    }
  ]
  formAttribute = {}
  rules = {
    org: [{ required: true, message: '请输入工单编号' }],
    jddw: [{ required: true, message: '请选择接单单位' }],
    address: [{ required: true, message: '请选择接单单位' }]
  }
  //提交保存
  public handleSubmit(): void {
    ;(this.$refs.myform as any).handleSubmit()
  }
  //form返回值
  public handleSaveForm(data: object): void {
    console.log(data)
  }
```
