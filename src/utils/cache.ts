import dayjs from 'dayjs'
import { encryptData, decryptData } from './cryptojs'

/**
 * 设置缓存时间,返回时间戳
 * @param {*} expireTimes
 */
const getExpireTimes = (expireTimes: any) => {
  let _expires = dayjs().add(1, 'day').valueOf() // 默认一天时间
  const reg = /^(\d{1,})(?:y|m|d|h|min|s)$/i
  const expireTime = expireTimes.replace(reg, '$1')
  if (expireTimes) {
    switch (expireTimes.constructor) {
      case Number:
        _expires = dayjs().add(expireTimes, 'second').valueOf()
        break
      case String:
        if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes.toString())) {
          // get capture type group , to lower case
          switch (
            expireTimes
              .toString()
              .replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, '$1')
              .toLowerCase()
          ) {
            // Frequency sorting
            case 'm': //月
              _expires = dayjs().add(expireTime, 'month').valueOf()
              break
            case 'd': //天
              _expires = dayjs().add(expireTime, 'day').valueOf()
              break
            case 'h': //小时
              _expires = dayjs().add(expireTime, 'hour').valueOf()
              break
            case 'min': //分钟
              _expires = dayjs().add(expireTime, 'minute').valueOf()
              break
            case 's': //秒
              _expires = dayjs().add(expireTime, 'second').valueOf()
              break
            case 'y': //年
              _expires = dayjs().add(expireTime, 'year').valueOf()
              break
            default:
              new Error("unknown exception of 'set operation'")
          }
        } else {
          _expires = dayjs().add(expireTime, 'second').valueOf()
        }
        break
      case Date:
        _expires = dayjs(expireTimes.toUTCString()).valueOf()
        break
    }
  }
  return _expires
}

type valueType = string | object | string[]

const expireTime = (option: any, expire: number | string): number => {
  let _expire = 0
  if (expire) {
    _expire = getExpireTimes(expire)
  } else if (option && option.expire) {
    _expire = getExpireTimes(option.expire)
  }
  return _expire
}

export default {
  install(Vue: any, option: any) {
    let prefix = ''
    let isEncrypt = false
    const SECRET_KEY = option && option.isEncrypt ? option.isEncrypt : '123456'
    const SECRET_IV = option && option.SECRET_IV ? option.SECRET_IV : '123456'
    if (option && option.prefix) {
      prefix = option.prefix
    } else {
      prefix = process.env.VUE_APP_CACHEPREFIX || 'sxl-'
    }
    if (option && option.isEncrypt) {
      isEncrypt = option.isEncrypt
    }

    Vue.prototype.local = {
      set(key: string, value: valueType, expire: number | string) {
        if (!localStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: isEncrypt
              ? encryptData(value, SECRET_KEY, SECRET_IV)
              : value,
            expire: expireTime(option, expire)
          }
          localStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },
      get(key: string) {
        if (!localStorage) {
          return null
        }
        if (key == null) {
          return null
        }
        let value = null
        let data: any = localStorage.getItem(prefix + key)
        if (data !== null) {
          data = JSON.parse(data)
          if (data.expire === 0) {
            value = data.value
          } else if (data.expire < Date.now()) {
            value = null
            this.remove(key)
          } else {
            value = data.value
          }
        }
        return isEncrypt ? decryptData(value, SECRET_KEY, SECRET_IV) : value
      },
      setJSON(key: string, jsonValue: valueType, expire: number | string) {
        if (jsonValue != null) {
          this.set(key, jsonValue, option.expire || expire)
        }
      },
      getJSON(key: string) {
        const value = this.get(key)
        if (value != null) {
          return value
        } else {
          return null
        }
      },
      remove(key: string) {
        localStorage.removeItem(prefix + key)
      }
    }

    Vue.prototype.session = {
      set(key: string, value: valueType, expire: number | string) {
        if (!sessionStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: isEncrypt
              ? encryptData(value, SECRET_KEY, SECRET_IV)
              : value,
            expire: expireTime(option, expire)
          }
          sessionStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },
      get(key: string) {
        if (!sessionStorage) {
          return null
        }
        if (key == null) {
          return null
        }
        let value = null
        let data: any = sessionStorage.getItem(prefix + key)
        if (data !== null) {
          data = JSON.parse(data)
          if (data.expire === 0) {
            value = data.value
          } else if (data.expire < Date.now()) {
            value = null
            this.remove(key)
          } else {
            value = data.value
          }
        }
        return isEncrypt ? decryptData(value, SECRET_KEY, SECRET_IV) : value
      },
      setJSON(key: string, jsonValue: valueType, expire: number | string) {
        if (jsonValue != null) {
          this.set(key, jsonValue, expire)
        }
      },
      getJSON(key: string) {
        const value = this.get(key)
        if (value != null) {
          return value
        } else {
          return null
        }
      },
      remove(key: string) {
        sessionStorage.removeItem(prefix + key)
      }
    }
  }
}
