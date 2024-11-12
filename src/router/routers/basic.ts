import { BasicRouteRecordRaw } from '../types/index'
import { REDIRECT_NAME } from '../constant'
import { RouterView } from 'vue-router'

export const REDIRECT_ROUTER: BasicRouteRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideInBreadcrumb: true,
    hideInMenu: true
  },
  children: [
    {
      path: ':path(.*)',
      name: REDIRECT_NAME,
      component: RouterView,
      meta: {
        title: REDIRECT_NAME,
        hideInMenu: true
      },
      beforeEnter: (to) => {
        const { params, query } = to
        const { path, redirectType = 'path' } = params
        Reflect.deleteProperty(params, '_redirect_type')
        Reflect.deleteProperty(params, 'path')
        const _path = Array.isArray(path) ? path.join('/') : path
        setTimeout(() => {
          if (redirectType === 'name') {
          }
        })
      }
    }
  ]
}
