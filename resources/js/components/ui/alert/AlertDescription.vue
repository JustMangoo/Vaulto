<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-description"
    class="alert-description"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.alert-description {
    grid-column: 2;
    font-size: 0.875rem;
    color: var(--muted-foreground);

    :deep(p) {
        line-height: 1.6;
    }
}
</style>
