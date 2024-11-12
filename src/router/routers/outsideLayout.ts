import { LOGIN_NAME } from '../constant'
import { BasicRouteRecordRaw } from '../types'

export const LoginRoute: BasicRouteRecordRaw = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import('@/pages/system/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export default [LoginRoute]
