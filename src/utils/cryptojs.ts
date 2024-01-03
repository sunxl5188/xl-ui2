import CryptoJS from 'crypto-js'
type valueType = string | object | string[]

const key = CryptoJS.MD5('3333e6e143439161').toString()
const vi = CryptoJS.MD5('e3bbe7e3ba84431a').toString()
const SECRET_KEY = CryptoJS.enc.Utf8.parse(key) //十六位十六进制数作为密钥
const SECRET_IV = CryptoJS.enc.Utf8.parse(vi) //十六位十六进制数作为密钥偏移量

/**
 * AES加密
 * @param data 加密数据
 * @returns 返回加密数据
 */
export const encryptData = (data: valueType): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data)
    } catch (e) {
      throw new Error('encrypt error' + e)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * AES解密
 * @param data 解密数据
 * @returns 返回解密结果
 */
export const decryptData = (data: string): valueType => {
  //解密
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
