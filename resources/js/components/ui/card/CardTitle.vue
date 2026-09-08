<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <h3
    data-slot="card-title"
    class="card-title"
    :class="cn(props.class)"
  >
    <slot />
  </h3>
</template>

<style lang="scss" scoped>
.card-title {
    grid-column: 1;
    line-height: 1;
    font-weight: 600;
}
</style>
