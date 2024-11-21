import { LocaleType } from '@/locales/config'
import { store } from '@/store'
import { defineStore } from 'pinia'
import { Storage } from '@/utils/Storage'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { ref } from 'vue'
import { LoginParams } from '@/api/system/user'
import to from '@/utils/awaitTo'
import { login, logout } from '@/api/system/user/index'
import { BaseApi } from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(Storage.get('TOKEN_KEY'))
  const setToken = (val: string) => {
    token.value = val
    Storage.set(TOKEN_KEY, val)
  }
  const removeToken = () => {
    token.value = ''
    Storage.remove(TOKEN_KEY)
  }
  const authLogin = async (params: LoginParams) => {
    const [err, res] = await to<BaseApi<string>>(login(params))
    if (!err) {
      afterLogin()
      setToken(res.data)
    } else {
      return Promise.reject(err)
    }
  }
  const afterLogin = () => {}
  const loginOut = async () => {
    await logout()
    removeToken()
  }
  return {
    token,
    loginOut,
    authLogin
  }
})

// 使用在setup外面
export function useUserStoreWithOut() {
  return useUserStore(store)
}
