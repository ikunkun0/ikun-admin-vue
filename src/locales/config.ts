export const localeMap = {
  zh_CN: 'zh_CN',
  en: 'en'
} as const

export type LocaleType = keyof typeof localeMap
