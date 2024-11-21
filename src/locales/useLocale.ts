import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { LocaleType } from './config'
import { LOCALE_KEY } from '@/enums/cacheEnum'
import { Storage } from '@/utils/Storage'

export function useLocale() {
  const localStore = useLocaleStoreWithOut()
  let language = computed(() => localStore.getLocale)
  const locale = computed(() => (language.value === 'zh_CN' ? zhCn : en))
  const changeLocale = (locale: LocaleType) => {
    if (language.value === locale) {
      // 如果是当前语言则不切换
      return
    }
    localStore.setLocale(locale)
  }
  return {
    locale,
    language,
    changeLocale
  }
}
