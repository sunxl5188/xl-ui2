import dayjs from 'dayjs'
import { encryptData, decryptData } from './cryptojs'
//https://blog.csdn.net/m0_46995864/article/details/125383362
//https://blog.csdn.net/jx520/article/details/129688159

/**
 * 设置缓存时间,返回时间戳
 * @param {*} expireTimes
 */
const getExpireTimes = (expireTimes: any) => {
  let _expires = dayjs().add(1, 'day').valueOf() // 默认一天时间
  const reg = /^(\d+)(?:[ymdh])$/i
  const expireTime = expireTimes.replace(reg, '$1')
  if (expireTimes) {
    switch (expireTimes.constructor) {
      case Number:
        _expires = dayjs().add(expireTimes, 'second').valueOf()
        break
      case String:
        if (/^(?:\d+[ymdh])$/i.test(expireTimes.toString())) {
          // get capture type group , to lower case
          switch (
            expireTimes
              .toString()
              .replace(/^(?:\d+)[ymdh]$/i, '$1')
              .toLowerCase()
          ) {
            // Frequency sorting
            case 'y': //年
              _expires = dayjs().add(expireTime, 'year').valueOf()
              break
            case 'm': //月
              _expires = dayjs().add(expireTime, 'month').valueOf()
              break
            case 'd': //天
              _expires = dayjs().add(expireTime, 'day').valueOf()
              break
            case 'h': //小时
              _expires = dayjs().add(expireTime, 'hour').valueOf()
              break
            default:
              console.error('未知异常')
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
    const prefix = option.prefix || 'xl-'
    const local = {
      set(key: string, value: valueType, expire: number | string) {
        if (!localStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
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
          if (value) {
            value = option.isEncrypt
              ? decryptData(value, option.SECRET_KEY, option.SECRET_IV)
              : value
          }
        }
        return value
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

    const session = {
      set(key: string, value: valueType, expire: number | string) {
        if (!sessionStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
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
        if (value) {
          value = option.isEncrypt
            ? decryptData(value, option.SECRET_KEY, option.SECRET_IV)
            : value
        }
        return value
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

    Vue.prototype.$cache = {
      local: local,
      session: session
    }
  }
}
