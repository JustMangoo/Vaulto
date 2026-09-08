<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="sheet-footer"
    class="sheet-footer"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sheet-footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
}
</style>
