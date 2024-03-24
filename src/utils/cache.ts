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
            case 'm': //月
              _expires = dayjs().add(expireTime, 'month').valueOf()
              break
            case 'd': //天
              _expires = dayjs().add(expireTime, 'day').valueOf()
              break
            case 'h': //小时
              _expires = dayjs().add(expireTime, 'hour').valueOf()
              break
            case 'y': //年
              _expires = dayjs().add(expireTime, 'year').valueOf()
              break
            default:
              console.error("unknown exception of 'set operation")
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

type TimeType = string | number | Date | undefined

const expireTime = (option: any, expire: TimeType): number => {
  let _expire = 0
  if (expire) {
    _expire = getExpireTimes(expire)
  } else if (option?.expire) {
    _expire = getExpireTimes(option.expire)
  }
  return _expire
}

export default {
  install(Vue: any, option: any) {
    const prefix = option.prefix || 'xl-'
    const local = {
      /**
       * 设置localStorage缓存
       * @param key localStorage名
       * @param value localStorage 值
       * @param expire 过期时间
       * @returns
       */
      set(key: string, value: any, expire?: TimeType) {
        if (!localStorage) {
          return
        }
        if (key !== null && value !== null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
              : JSON.stringify(value),
            expire: expireTime(option, expire)
          }
          localStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },
      /**
       * 获取localStorage值
       * @param key localStorage名
       * @returns localStorage 值
       */
      get(key: string) {
        let value = ''
        if (key && localStorage) {
          let data: any = localStorage.getItem(prefix + key)
          if (data !== null) {
            data = JSON.parse(data)
            if (data.expire === 0) {
              value = data.value
            } else if (data.expire < Date.now()) {
              this.remove(key)
            } else {
              value = data.value
            }
            if (option.isEncrypt) {
              value = decryptData(value, option.SECRET_KEY, option.SECRET_IV)
            }
          }
        }
        return JSON.parse(value)
      },
      /**
       * 删除localStorage
       * @param key localStorage名
       */
      remove(key: string) {
        localStorage.removeItem(prefix + key)
      }
    }

    const session = {
      /**
       * 设置sessionStorage
       * @param key sessionStorage名
       * @param value sessionStorage值
       * @param expire 过期时间
       * @returns void
       */
      set(key: string, value: any, expire?: TimeType) {
        if (!sessionStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
              : JSON.stringify(value),
            expire: expireTime(option, expire)
          }
          sessionStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },
      /**
       * 获取 sessionStorage
       * @param key sessionStorage名
       * @returns 返回sessionStorage值得
       */
      get(key: string) {
        let value = ''
        if (key && sessionStorage) {
          let data: any = sessionStorage.getItem(prefix + key)
          if (data !== null) {
            data = JSON.parse(data)
            if (data.expire === 0) {
              value = data.value
            } else if (data.expire < Date.now()) {
              this.remove(key)
            } else {
              value = data.value
            }
          }
          if (option.isEncrypt) {
            value = decryptData(value, option.SECRET_KEY, option.SECRET_IV)
          }
        }
        return JSON.parse(value)
      },
      /**
       * 删除sessionStorage
       * @param key sessionStorage名
       */
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
