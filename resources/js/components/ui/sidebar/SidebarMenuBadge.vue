<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    class="sidebar-menu-badge"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-menu-badge {
    position: absolute;
    top: 0.375rem;
    right: 0.25rem;
    display: flex;
    height: 1.25rem;
    min-width: 1.25rem;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    padding: 0 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: var(--sidebar-foreground);
    pointer-events: none;
    user-select: none;
}
</style>
