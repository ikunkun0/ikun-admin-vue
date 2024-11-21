<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { router } from 'vue-router'

defineOptions({
  name: 'UserAvator'
})

const userStore = useUserStore()

const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const logout = async () => {
  await userStore.loginOut()
  router.push('/')
}
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="less"></style>
