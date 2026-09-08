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
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    class="sidebar-group-action"
    :class="cn(props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.sidebar-group-action {
    position: absolute;
    top: 0.875rem;
    right: 0.75rem;
    display: flex;
    aspect-ratio: 1 / 1;
    width: 1.25rem;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    padding: 0;
    color: var(--sidebar-foreground);
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        background: var(--sidebar-accent);
        color: var(--sidebar-accent-foreground);
    }

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }
}
</style>
