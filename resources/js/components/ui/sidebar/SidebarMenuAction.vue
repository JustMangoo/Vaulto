<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & {
  showOnHover?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    class="sidebar-menu-action"
    :class="cn(props.class)"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.sidebar-menu-action {
    position: absolute;
    top: 0.375rem;
    right: 0.25rem;
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
