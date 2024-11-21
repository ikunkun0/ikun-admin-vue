/**
 * 创建本地缓存对象
 */
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage
} = {}) => {
  /**
   * 本地缓存类
   */
  const Storage = class {
    private storage = storage
    private prefixKey?: string = prefixKey

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }
    /**
     * 设置缓存值
     * @param key 缓存的key
     * @param value 缓存的value值
     * @param expire 缓存的时间
     */
    set(key: string, value: any, expire: number | null = null) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null
      })
      this.storage.setItem(this.getKey(key), stringData)
    }

    /**
     * 获取缓存值
     * @param key
     * @param def
     * @returns
     */
    get(key: string, def: any = null) {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        try {
          const data = JSON.parse(item)
          const { value, expire } = data
          if (expire === null || expire >= Date.now()) {
            return value
          }
          // 超时的直接删除
          this.remove(this.getKey(key))
        } catch (e) {
          console.error(e)
          return def
        }
      }
      return def
    }
    /**
     * 删除某项
     * @param key
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }
    /**
     * 清空缓存
     */
    clear() {
      this.storage.clear()
    }
    /**
     * 设置cookie
     * @param {string} name cookie 名称
     * @param {*} value cookie 值
     * @param {number=} expire 过期时间
     * 如果过期时间为设置，默认关闭浏览器自动删除
     * @example
     */
    setCookie(name: string, value: any, expire: number | null = null) {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`
    }

    /**
     * 根据名字获取cookie值
     * @param name
     */
    getCookie(name: string): string {
      const cookieArr = document.cookie.split('; ')
      for (let i = 0, length = cookieArr.length; i < length; i++) {
        const kv = cookieArr[i].split('=')
        if (kv[0] === this.getKey(name)) {
          return kv[1]
        }
      }
      return ''
    }

    /**
     * 根据名字删除指定的cookie
     * @param {string} key
     */
    removeCookie(key: string) {
      this.setCookie(key, 1, -1)
    }

    /**
     * 清空cookie，使所有cookie失效
     */
    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g)
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`
        }
      }
    }
  }
  return new Storage()
}

export const Storage = createStorage()

export default Storage
