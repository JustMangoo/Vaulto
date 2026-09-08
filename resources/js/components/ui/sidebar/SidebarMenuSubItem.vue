<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    class="sidebar-menu-sub-item"
    :class="cn(props.class)"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.sidebar-menu-sub-item {
    position: relative;
}
</style>
