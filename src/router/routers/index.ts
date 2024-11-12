import outsideLayout from './outsideLayout'
import { LOGIN_NAME } from '../constant'
import { BasicRouteRecordRaw } from '../types'

export const rootRoute: BasicRouteRecordRaw = {
  path: '/layout',
  name: 'Layout',
  // redirect: '/system/dashboard/welcome',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '跟路由'
  }
}

export const basicRoutes: Array<BasicRouteRecordRaw> = [
  rootRoute,
  {
    path: '/login',
    name: LOGIN_NAME,
    component: () => import('@/pages/system/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  ...outsideLayout
]
