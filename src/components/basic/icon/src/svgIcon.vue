<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { SvgIconProps } from './props'

defineOptions({
  name: 'SvgIcon'
})

const props = withDefaults(defineProps<SvgIconProps>(), {
  prefix: 'svg-icon',
  size: 16
})

const symbolId = computed(() => {
  return `#${props.prefix}-${props.name}`
})

const getStyle = computed((): CSSProperties => {
  const { size } = props
  const s = `${size}`.replace('px', '').concat('px')
  return {
    width: s,
    height: s
  }
})
</script>

<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  overflow: hidden;
  fill: currentcolor;
  vertical-align: -0.15em;
}
</style>
