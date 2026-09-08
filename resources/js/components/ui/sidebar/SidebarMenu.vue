<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    class="sidebar-menu"
    :class="cn(props.class)"
  >
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.sidebar-menu {
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
