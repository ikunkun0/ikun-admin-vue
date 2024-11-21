<script setup lang="ts">
import { useLocale } from '@/locales/useLocale'
const { locale } = useLocale()
</script>

<template>
  <el-config-provider :locale="locale">
    <slot></slot>
  </el-config-provider>
</template>

<style scoped></style>
