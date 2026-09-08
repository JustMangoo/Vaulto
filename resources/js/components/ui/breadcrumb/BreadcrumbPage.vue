<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    class="breadcrumb-page"
    :class="cn(props.class)"
  >
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.breadcrumb-page {
    color: var(--foreground);
    font-weight: 400;
}
</style>
