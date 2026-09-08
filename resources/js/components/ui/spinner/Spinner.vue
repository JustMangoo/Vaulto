<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Loader2Icon } from "@lucide/vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Loader2Icon
    role="status"
    aria-label="Loading"
    class="spinner"
    :class="cn(props.class)"
  />
</template>

<style lang="scss" scoped>
.spinner {
    width: 1rem;
    height: 1rem;
    animation: spinner-spin 1s linear infinite;
}

@keyframes spinner-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
