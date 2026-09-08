<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AlertVariant } from "."
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: AlertVariant
}>(), {
  variant: "default",
})
</script>

<template>
  <div
    data-slot="alert"
    class="alert"
    :class="cn(`alert--${variant}`, props.class)"
    role="alert"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.alert {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.75rem;
    row-gap: 0.125rem;
    align-items: start;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    background: var(--card);
    color: var(--card-foreground);

    :deep(> svg) {
        grid-column: 1;
        grid-row: 1 / -1;
        width: 1rem;
        height: 1rem;
        margin-top: 0.125rem;
        color: currentColor;
    }

    &--destructive {
        color: var(--destructive);
    }
}
</style>
