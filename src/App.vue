<script setup lang="ts">
import ProConfigProvider from '@/components/pro-config-provider/index.vue'
</script>

<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </ProConfigProvider>
</template>

<style scoped></style>
