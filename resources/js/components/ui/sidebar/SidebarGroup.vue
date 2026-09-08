<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    class="sidebar-group"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-group {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    padding: 0.5rem;
}
</style>
