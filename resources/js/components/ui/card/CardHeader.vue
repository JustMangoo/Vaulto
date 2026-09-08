<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-header"
    class="card-header"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 0.375rem;
    padding: 0 1.5rem;
}
</style>
