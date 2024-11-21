<script setup lang="ts">
import { ref } from 'vue'
import LayoutHeader from './header/index.vue'
import SiderMenu from './menu/index.vue'
const collapsed = ref(false)
</script>

<template>
  <el-container class="full">
    <SiderMenu :collapse="collapsed"></SiderMenu>
    <el-container>
      <el-header class="layout-height">
        <LayoutHeader v-model:collapsed="collapsed"></LayoutHeader>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.layout-height {
  height: var(--app-header-height);
  padding: 0;
}
</style>
