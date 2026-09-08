<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-item"
    class="breadcrumb-item"
    :class="cn(props.class)"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}
</style>
