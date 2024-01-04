import request from '@/utils/request'

interface arrType {
  label: string
  value: string
}

export default {
  async bind(el: any, binding: any, vnode: any) {
    const code = Object.keys(binding.value)[0]
    const val = binding.value[code]
    let url = '/code.php?' + code
    if (code.indexOf('/') > -1) {
      url = code
    }
    const { data } = await request({
      url,
      method: 'get'
    })
    const arr: arrType[] = data.filter((item: any) => item.value === val)
    if (arr.length) {
      el.innerHTML = arr[0].label
    }
  }
}
