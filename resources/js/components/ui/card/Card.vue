<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card"
    class="card"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    padding: 1.5rem 0;
    background: var(--card);
    color: var(--card-foreground);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
</style>
