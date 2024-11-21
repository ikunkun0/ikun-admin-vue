<script setup lang="ts">
import { BasicRouteRecordRaw } from '@/router/types'
import { ArrowDown } from '@element-plus/icons-vue'

defineOptions({
  name: 'BreadcrumbItem'
})

interface BreadcrumbItemProp {
  itemInfo: BasicRouteRecordRaw
}
const { itemInfo } = defineProps<BreadcrumbItemProp>()
const tabBreadCrumbItem = (item: BasicRouteRecordRaw) => {
  console.log('item', item)
}
</script>

<template>
  <el-breadcrumb-item>
    <el-dropdown>
      <span class="el-dropdown-link cursor-pointer">
        {{ itemInfo.name }}
        <el-icon
          class="el-icon--right"
          v-if="itemInfo.children && itemInfo.children.length > 0"
        >
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu
          v-if="itemInfo.children && itemInfo.children.length > 0"
        >
          <el-dropdown-item
            v-for="item in itemInfo.children"
            :key="item.path"
            @click="tabBreadCrumbItem(item)"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-breadcrumb-item>
</template>

<style scoped lang="less">
.el-icon--right {
  margin-top: -3px;
  position: relative;
  top: 2px;
}
</style>
