import request from './request'

/**
 * 获取字典
 * @param code 字典ID
 * @returns Data
 */
export const getCode = (url: string) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'get'
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
