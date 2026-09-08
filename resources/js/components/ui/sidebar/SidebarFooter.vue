<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    class="sidebar-footer"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
}
</style>
