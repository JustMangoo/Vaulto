<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <main
    data-slot="sidebar-inset"
    class="sidebar-inset"
    :class="cn(props.class)"
  >
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.sidebar-inset {
    position: relative;
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    background: var(--background);
}
</style>
