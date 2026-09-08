<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

export interface SidebarMenuButtonProps extends PrimitiveProps {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  isActive?: boolean
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: "button",
  variant: "default",
  size: "default",
})
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    class="sidebar-menu-button"
    :class="cn({ 'sidebar-menu-button--outline': variant === 'outline' }, props.class)"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.sidebar-menu-button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
    border-radius: var(--radius-md);
    padding: 0.5rem;
    text-align: left;
    font-size: 0.875rem;
    color: inherit;
    background: transparent;
    border: none;
    cursor: pointer;
    transition:
        width 200ms,
        height 200ms,
        padding 200ms;

    &:hover {
        background: var(--sidebar-accent);
        color: var(--sidebar-accent-foreground);
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    &[data-active='true'] {
        background: var(--sidebar-accent);
        font-weight: 500;
        color: var(--sidebar-accent-foreground);
    }

    &[data-size='sm'] {
        height: 1.75rem;
        font-size: 0.75rem;
    }

    &[data-size='lg'] {
        height: 3rem;
    }

    &--outline {
        background: var(--background);
        box-shadow: 0 0 0 1px var(--sidebar-border);

        &:hover {
            background: var(--sidebar-accent);
            color: var(--sidebar-accent-foreground);
        }
    }

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    :deep(span:last-child) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
