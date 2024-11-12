import type { RouteRecordRaw } from 'vue-router'
interface BasicMeta {
  title?: string
  hideInMenu?: boolean // 是否隐藏菜单
  hideInBreadcrumb?: boolean // 是否隐藏面包屑
}

export type BasicRouteRecordRaw = Omit<RouteRecordRaw, 'meta' | 'children'> & {
  meta?: BasicMeta
  children?: BasicRouteRecordRaw[]
}
