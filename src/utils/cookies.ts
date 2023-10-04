import VueCookies from 'vue-cookies'
const prefix = process.env.VUE_APP_CACHEPREFIX

const _VueCookies: any = VueCookies

const cookies = {
  get: (key: string) => {
    return _VueCookies.get(prefix + key)
  },
  set: (
    key: string,
    value: string,
    expires: string,
    path: string,
    domain: string,
    secure: string,
    sameSite: string
  ) => {
    _VueCookies.set(
      prefix + key,
      value,
      expires,
      path,
      domain,
      secure,
      sameSite
    )
  },
  remove: (key: string, path: string, domain: string) => {
    _VueCookies.remove(prefix + key, path, domain)
  },
  isKey: (key: string) => {
    return _VueCookies.isKey(prefix + key)
  },
  keys: () => {
    return _VueCookies.keys()
  }
}

export default cookies
