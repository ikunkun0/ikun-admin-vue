// 创建路由守卫

import type { Router } from 'vue-router'
import { WhiteNameList } from './constant'

export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
) {
  // router.beforeEach((to, from, next) => {
  //   if ()
  // })
}
