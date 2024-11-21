import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { basicRoutes } from './routers'
import { createRouterGuards } from './router-guards'
import { whiteNameList } from './constant'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as RouteRecordRaw[]
})

export async function setupRouter(app: App) {
  createRouterGuards(router, whiteNameList)
  app.use(router)

  // 路由准备就绪后挂载APP实例
  await router.isReady()
}

export default router
