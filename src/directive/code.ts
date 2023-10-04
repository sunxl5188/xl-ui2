import request from '@/utils/request'
import CACHE from '@/utils/cache'

export default {
  async bind(el: any, binding: any, vnode: any) {
    const { cache } = binding.value
    const code = Object.keys(binding.value)[0]

    const val = binding.value[code]
    let url = '/code.php?' + code
    if (code.indexOf('/') > -1) {
      url = code
    }
    if (cache) {
      if (!CACHE.local.getJSON(code)) {
        const { data } = await request({
          url,
          method: 'get'
        })
        CACHE.local.setJSON(code, data, '1d')
      }

      const datas = CACHE.local.getJSON(code)
      const arr = datas.filter((item: any) => item.value === val)
      if (arr.length) {
        el.innerHTML = arr[0].label
      }
    } else {
      const { data } = await request({
        url,
        method: 'get'
      })
      const arr = data.filter((item: any) => item.value === val)
      if (arr.length) {
        el.innerHTML = arr[0].label
      }
    }
  }
}
