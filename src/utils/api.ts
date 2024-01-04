import request from './request'

/**
 * 获取字典
 * @param code 字典ID
 * @returns Data
 */
export const getCode = (url: string, cache: any) => {
  return new Promise((resolve, reject) => {
    if (cache.session.get(url)) {
      resolve(cache.session.get(url))
    } else {
      request({
        url,
        method: 'get'
      })
        .then((res: any) => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}
