<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p
    data-slot="card-description"
    class="card-description"
    :class="cn(props.class)"
  >
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.card-description {
    grid-column: 1;
    font-size: 0.875rem;
    color: var(--muted-foreground);
}
</style>
