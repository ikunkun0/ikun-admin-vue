<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Breadcrumb from './component/breadcrumb/index.vue'
import HeaderSearch from './component/search/index.vue'
import LockScreen from './component/lockScreen/index.vue'
import FullScreen from './component/fullScreen/index.vue'
import UserAvator from './component/userAvator/index.vue'
import Setting from './component/setting/index.vue'
import localePicker from '@/components/basic/locale-picker/index.vue'

interface HeaderProps {
  collapsed: boolean
}

const emits = defineEmits(['update:collapsed'])
const { collapsed } = defineProps<HeaderProps>()

const toggleCollapsed = () => {
  emits('update:collapsed', !collapsed)
}
</script>

<template>
  <ElSpace
    class="layout-header border-c w-full h-full justify-between px-10px box-border"
  >
    <ElSpace>
      <el-icon class="cursor-pointer" @click="toggleCollapsed"
        ><Component :is="collapsed ? Expand : Fold"
      /></el-icon>
      <!-- 菜单导航 -->
      <Breadcrumb></Breadcrumb>
    </ElSpace>
    <ElSpace>
      <HeaderSearch></HeaderSearch>
      <LockScreen></LockScreen>
      <FullScreen></FullScreen>
      <localePicker></localePicker>
      <UserAvator></UserAvator>
      <Setting></Setting>
    </ElSpace>
  </ElSpace>
</template>

<style scoped>
.layout-header {
  border-bottom: 1px solid #eee;
}
</style>
