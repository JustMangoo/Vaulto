<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
    data-slot="skeleton"
    class="skeleton"
    :class="cn(props.class)"
  />
</template>

<style lang="scss" scoped>
.skeleton {
    border-radius: var(--radius-md);
    background: var(--primary);
    opacity: 0.1;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    0%,
    100% {
        opacity: 0.1;
    }
    50% {
        opacity: 0.2;
    }
}
</style>
