<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { ChevronRight } from "@lucide/vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    class="breadcrumb-separator"
    :class="cn(props.class)"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>

<style lang="scss" scoped>
.breadcrumb-separator {
    display: flex;
    align-items: center;

    :deep(svg) {
        width: 0.875rem;
        height: 0.875rem;
    }
}
</style>
