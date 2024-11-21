import { LocaleType } from '@/locales/config'
import { store } from '@/store'
import { defineStore } from 'pinia'
import { Storage } from '@/utils/Storage'
import { LOCALE_KEY } from '@/enums/cacheEnum'

interface LocaleState {
  locale: LocaleType
}
export const useLocalStore = defineStore('locale', {
  state: (): LocaleState => ({
    locale: Storage.get(LOCALE_KEY, 'zh_CN')
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'zh_CN'
    }
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      Storage.set(LOCALE_KEY, locale)
    }
  }
})

// 使用在setup外面
export function useLocaleStoreWithOut() {
  return useLocalStore(store)
}
