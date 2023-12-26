import CryptoJS from 'crypto-js'
type valueType = string | object | string[]

export const encryptData = (data: valueType, key: string) => {
  // 将数据转换为字符串
  const dataStr = JSON.stringify(data)
  // 使用AES算法进行加密
  const encryptedData = CryptoJS.AES.encrypt(dataStr, key).toString()
  // 返回加密后的数据
  return encryptedData
}

export const decryptData = (encryptedData: string, key: string) => {
  // 使用AES算法进行解密
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  )
  // 将解密后的字符串转换为对象
  const data = JSON.parse(decryptedData)
  // 返回解密后的数据
  return data
}
