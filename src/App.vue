<template>
  <div class="p-10">
    {{ formData }}
    <XlForm
      ref="myform"
      v-model="formData"
      :form-item="formItem"
      :rules="rules"
      :form-attribute="formAttribute"
    ></XlForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// @ is an alias to /src

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  formData = { aa: '选项1', a: '', ab: '', abb: ['1'] }
  formItem = [
    {
      label: '关',
      prop: 'aa',
      type: 'select',
      span: 8,
      formItemAttr: {},
      attribute: {
        data: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ]
      }
    },
    {
      label: '1',
      prop: 'a',
      span: 8,
      formItemAttr: {},
      attribute: {}
    },
    {
      label: '1',
      prop: 'ab',
      type: 'tree',
      span: 8,
      formItemAttr: {},
      attribute: {
        data: [
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
          }
        ]
      }
    },
    {
      label: '1',
      prop: 'abb',
      type: 'checkbox',
      span: 8,
      formItemAttr: {},
      attribute: {
        data: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ]
      }
    }
  ]
  formAttribute = {}
  rules = {}
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
