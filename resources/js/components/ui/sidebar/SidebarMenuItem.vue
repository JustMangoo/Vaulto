<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    class="sidebar-menu-item"
    :class="cn(props.class)"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.sidebar-menu-item {
    position: relative;
}
</style>
