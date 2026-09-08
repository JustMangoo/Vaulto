<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    class="sidebar-menu-sub"
    :class="cn(props.class)"
  >
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.sidebar-menu-sub {
    margin: 0 0.875rem;
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    border-left: 1px solid var(--sidebar-border);
    padding: 0.125rem 0.625rem;
}
</style>
