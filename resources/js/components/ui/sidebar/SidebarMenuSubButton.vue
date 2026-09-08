<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & {
  size?: "sm" | "md"
  isActive?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "a",
  size: "md",
})
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    class="sidebar-menu-sub-button"
    :class="cn(props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.sidebar-menu-sub-button {
    display: flex;
    height: 1.75rem;
    min-width: 0;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
    border-radius: var(--radius-md);
    padding: 0 0.5rem;
    color: var(--sidebar-foreground);
    text-decoration: none;

    &:hover {
        background: var(--sidebar-accent);
        color: var(--sidebar-accent-foreground);
    }

    &[data-active='true'] {
        background: var(--sidebar-accent);
        color: var(--sidebar-accent-foreground);
    }

    &[data-size='sm'] {
        font-size: 0.75rem;
    }

    &[data-size='md'] {
        font-size: 0.875rem;
    }

    &[aria-disabled='true'] {
        pointer-events: none;
        opacity: 0.5;
    }

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        color: var(--sidebar-accent-foreground);
    }

    :deep(span:last-child) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
