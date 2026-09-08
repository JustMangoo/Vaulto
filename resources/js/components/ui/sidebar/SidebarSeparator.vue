<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    class="sidebar-separator"
    :class="cn(props.class)"
  >
    <slot />
  </Separator>
</template>

<style lang="scss" scoped>
.sidebar-separator {
    margin: 0 0.5rem;
    width: auto;
    background: var(--sidebar-border);
}
</style>
