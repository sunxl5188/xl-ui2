import dayjs from 'dayjs'
import { encryptData, decryptData } from './cryptojs'

//https://blog.csdn.net/m0_46995864/article/details/125383362
//https://blog.csdn.net/jx520/article/details/129688159

interface OptionType {
  prefix: string //存储前缀
  expire: string //过期时间，默认为一天
  isEncrypt: boolean //支持加密、解密数据处理
  SECRET_KEY: string //加密的KEY,十六位十六进制数作为密钥
  SECRET_IV: string //加密的IV,十六位十六进制数作为密钥偏移量
}

interface ValueType {
  value: string
  expire: number
}
type TimeType = string | number | Date

/* export default {
  install(Vue: any, option: any) {
    const prefix = option.prefix || 'xl-'
    const local = {
      set(key: string, value: any, expire?: TimeType) {
        if (!localStorage) {
          return
        }
        if (key !== null && value !== null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
              : value,
            expire: getExpireTimes(expire ?? option.expire)
          }
          localStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },

      get(key: string): string | object {
        let value = ''
        if (!key && !localStorage) return ''

        let data: any = localStorage.getItem(prefix + key)
        if (data !== null) {
          data = JSON.parse(data)
          if (data.expire < Date.now()) {
            this.remove(key)
          } else {
            value = data.value
          }
          if (option.isEncrypt) {
            value = decryptData(value, option.SECRET_KEY, option.SECRET_IV)
            if (/^{(.*)}$/.test(value)) value = JSON.parse(value)
          }
        }
        return value
      },

      remove(key: string) {
        localStorage.removeItem(prefix + key)
      }
    }

    const session = {

      set(key: string, value: any, expire?: TimeType) {
        if (!sessionStorage) {
          return
        }
        if (key != null && value != null) {
          const data = {
            value: option.isEncrypt
              ? encryptData(value, option.SECRET_KEY, option.SECRET_IV)
              : value,
            expire: getExpireTimes(expire ?? option.expire)
          }
          sessionStorage.setItem(prefix + key, JSON.stringify(data))
        }
      },

      get(key: string): string | object {
        let value = ''
        if (!key && !sessionStorage) return ''

        let data: any = sessionStorage.getItem(prefix + key)
        if (data !== null) {
          data = JSON.parse(data)
          if (data.expire < Date.now()) {
            this.remove(key)
          } else {
            value = data.value
          }
        }
        if (option.isEncrypt) {
          value = decryptData(value, option.SECRET_KEY, option.SECRET_IV)
          if (/^{(.*)}$/.test(value)) value = JSON.parse(value)
        }
        return value
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
} */

/**
 * 设置缓存时间
 * @param expires 缴缓存时间
 * @returns 时间戳
 */
const getExpireTimes = (expires: TimeType): number => {
  if (!expires) return 0
  let _expires = 0
  switch (expires.constructor) {
    case Number: {
      _expires = dayjs()
        .add(expires as number, 'second')
        .valueOf()
      break
    }
    case String: {
      const stringTime = expires as string
      if (/^(?:\d+(y|m|d|h|min|s))$/i.test(stringTime)) {
        const days = Number(stringTime.replace(/^(\d+)(y|m|d|h|min|s)$/i, '$1'))
        switch (
          stringTime.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()
        ) {
          case 'y': //年
            _expires = dayjs().add(days, 'year').valueOf()
            break
          case 'm': //月
            _expires = dayjs().add(days, 'month').valueOf()
            break
          case 'd': //天
            _expires = dayjs().add(days, 'day').valueOf()
            break
          case 'h': //小时
            _expires = dayjs().add(days, 'hour').valueOf()
            break
          case 'min': //分
            _expires = dayjs().add(days, 'minute').valueOf()
            break // 60
          case 's': //秒
            _expires = dayjs().add(days, 'second').valueOf()
            break
          default:
            _expires = 0
            console.error('未知异常')
        }
      }
      break
    }
    case Date:
      _expires = dayjs((expires as Date).toUTCString()).valueOf()
      break
  }
  return _expires
}

export class Local {
  prefix: string
  expire: string
  isEncrypt: boolean
  SECRET_KEY: string
  SECRET_IV: string
  constructor(params: OptionType) {
    this.prefix = params.prefix
    this.expire = params.expire
    this.isEncrypt = params.isEncrypt
    this.SECRET_KEY = params.SECRET_KEY
    this.SECRET_IV = params.SECRET_IV
  }
  public set(key: string, value: string | object, expire?: TimeType): void {
    if (key !== null && value !== null) {
      const data = {
        value: this.isEncrypt
          ? encryptData(value, this.SECRET_KEY, this.SECRET_IV)
          : value,
        expire: getExpireTimes(expire || this.expire)
      }
      localStorage.setItem(this.prefix + key, JSON.stringify(data))
    }
  }
  public get(key: string): string | object {
    let value = ''
    if (!key) return ''

    const data: string | null = localStorage.getItem(this.prefix + key)
    if (data !== null) {
      const obj: ValueType = JSON.parse(data)
      if (obj.expire < Date.now()) {
        this.remove(key)
      } else {
        value = obj.value
      }
      if (this.isEncrypt) {
        value = decryptData(value, this.SECRET_KEY, this.SECRET_IV)
        if (/^{(.*)}$/.test(value)) value = JSON.parse(value)
      }
    }
    return value
  }

  public remove(key: string): void {
    localStorage.removeItem(this.prefix + key)
  }
}

export class Session {
  prefix: string
  expire: string
  isEncrypt: boolean
  SECRET_KEY: string
  SECRET_IV: string
  constructor(opt: OptionType) {
    this.prefix = opt.prefix
    this.expire = opt.expire
    this.isEncrypt = opt.isEncrypt
    this.SECRET_KEY = opt.SECRET_KEY
    this.SECRET_IV = opt.SECRET_IV
  }
  set(): void {
    console.log(this.expire)
  }
  get(): string | object {
    return ''
  }
  remove(): void {}
}
