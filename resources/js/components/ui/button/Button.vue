<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonSize, ButtonVariant } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  variant?: ButtonVariant
  size?: ButtonSize
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    class="button"
    :class="cn(`button--${variant}`, `button--size-${size}`, props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-shrink: 0;
    white-space: nowrap;
    border-radius: var(--radius-md);
    border: none;
    font-size: 0.875rem;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transition: all 150ms;

    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    &:focus-visible {
        box-shadow: 0 0 0 3px var(--ring);
    }

    :deep(svg) {
        pointer-events: none;
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
    }

    &--default {
        background: var(--primary);
        color: var(--primary-foreground);

        &:hover {
            opacity: 0.9;
        }
    }

    &--destructive {
        background: var(--destructive);
        color: white;

        &:hover {
            opacity: 0.9;
        }
    }

    &--outline {
        background: var(--background);
        border: 1px solid var(--border);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

        &:hover {
            background: var(--accent);
            color: var(--accent-foreground);
        }
    }

    &--secondary {
        background: var(--secondary);
        color: var(--secondary-foreground);

        &:hover {
            opacity: 0.8;
        }
    }

    &--ghost {
        background: transparent;
        color: inherit;

        &:hover {
            background: var(--accent);
            color: var(--accent-foreground);
        }
    }

    &--link {
        background: transparent;
        color: var(--primary);
        text-underline-offset: 4px;

        &:hover {
            text-decoration: underline;
        }
    }

    &--size-default {
        height: 2.25rem;
        padding: 0.5rem 1rem;
    }

    &--size-sm {
        height: 2rem;
        gap: 0.375rem;
        padding: 0 0.75rem;
    }

    &--size-lg {
        height: 2.5rem;
        padding: 0 1.5rem;
    }

    &--size-icon {
        width: 2.25rem;
        height: 2.25rem;
        padding: 0;
    }

    &--size-icon-sm {
        width: 2rem;
        height: 2rem;
        padding: 0;
    }

    &--size-icon-lg {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
    }
}
</style>
