declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'element-plus' {
  export * from 'element-plus/dist/index'
}

declare module 'element-plus/dist/locale/*' {
  const locale: any
  export default locale
}
