// 创建路由守卫

import type { Router } from 'vue-router'
import { LOGIN_NAME, WhiteNameList } from './constant'
import { useUserStore } from '@/store/modules/user'

const defaultRoutePath = '/'

export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
) {
  router.beforeEach((to, from, next) => {
    const useStore = useUserStore()
    if (useStore.token) {
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath })
      } else {
        const hasRoute = router.hasRoute(to.name!)
        next()
      }
    } else {
      if (whiteNameList.some((n) => n === to.name)) {
        next()
      } else {
        next({ name: LOGIN_NAME })
      }
    }
  })
}
