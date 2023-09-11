import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') //全局使用
// 配置相对时间插件
dayjs.extend(relativeTime)

export default {
  install(Vue: any) {
    Vue.prototype.$dayjs = dayjs
    /* 
    全局模板过滤器
    参数1：过滤器名称
    参数2：过滤器函数
    使用方式：{{表达式||过滤器名称}}
    */
    Vue.filter('dayjs', (value: string) => {
      return dayjs().to(dayjs(value))
    })
  }
}
