<script setup lang="ts">
import { BasicRouteRecordRaw } from '@/router/types'
import BreadcrumbItem from './breadcrumbItem.vue'
import { computed } from 'vue'

defineOptions({
  name: 'Breadcrumb'
})

const path = '/gzt'

const menuList: BasicRouteRecordRaw[] = [
  {
    name: '首页',
    path: '/1',
    children: [
      {
        name: '仪表盘',
        path: '/2',
        children: [
          {
            name: '工作台',
            path: '/gzt'
          }
        ]
      },
      {
        name: 'demo演示',
        path: '/demo'
      },
      {
        name: '文档',
        path: '/wd'
      }
    ]
  }
]

function findParentsByPath(
  nodes: BasicRouteRecordRaw[],
  targetPath: string,
  pathStack: BasicRouteRecordRaw[] = []
): BasicRouteRecordRaw[] | null {
  for (const node of nodes) {
    pathStack.push({
      name: node.name,
      path: node.path,
      children: node.children
    })

    if (node.path === targetPath) {
      const tragetInfo = pathStack.slice(0)
      return tragetInfo // 找到目标路径，返回当前路径上的节点列表
    }

    if (node.children) {
      const result = findParentsByPath(node.children, targetPath, pathStack)
      if (result) {
        return result
      }
    }

    pathStack.pop() // 回溯
  }

  return null // 未找到目标路径
}

const breadcrumbList = computed(() => {
  return findParentsByPath(menuList, path)
})
</script>

<template>
  <el-breadcrumb>
    <BreadcrumbItem
      v-for="item in breadcrumbList"
      :item-info="item"
    ></BreadcrumbItem>
  </el-breadcrumb>
</template>

<style scoped></style>
