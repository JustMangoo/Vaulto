<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    class="sidebar-group-label"
    :class="cn(props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.sidebar-group-label {
    display: flex;
    height: 2rem;
    flex-shrink: 0;
    align-items: center;
    border-radius: var(--radius-md);
    padding: 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--sidebar-foreground);
    opacity: 0.7;

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }
}
</style>
