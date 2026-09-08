<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="dialog-header"
    class="dialog-header"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.dialog-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;

    @media (min-width: 640px) {
        text-align: left;
    }
}
</style>
