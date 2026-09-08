<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariant } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & {
  variant?: BadgeVariant
  class?: HTMLAttributes["class"]
}>(), {
  variant: "default",
})

const delegatedProps = reactiveOmit(props, "class", "variant")
</script>

<template>
  <Primitive
    data-slot="badge"
    class="badge"
    :class="cn(`badge--${variant}`, props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.badge {
    display: inline-flex;
    width: fit-content;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 9999px;
    border: 1px solid transparent;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;

    :deep(svg) {
        width: 0.75rem;
        height: 0.75rem;
        pointer-events: none;
    }

    &--default {
        background: var(--primary);
        color: var(--primary-foreground);
    }

    &--secondary {
        background: var(--secondary);
        color: var(--secondary-foreground);
    }

    &--destructive {
        background: var(--destructive);
        color: white;
    }

    &--outline {
        border-color: var(--border);
        color: var(--foreground);
    }
}
</style>
