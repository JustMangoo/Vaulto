<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    :tabindex="-1"
    title="Toggle Sidebar"
    class="sidebar-rail"
    :class="cn(props.class)"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.sidebar-rail {
    position: absolute;
    inset: 0 -0.5rem 0 auto;
    z-index: 20;
    display: none;
    width: 1rem;
    background: transparent;
    border: none;
    padding: 0;
    cursor: ew-resize;

    @media (min-width: 640px) {
        display: block;
    }

    &:hover {
        background: var(--sidebar-border);
    }
}
</style>
