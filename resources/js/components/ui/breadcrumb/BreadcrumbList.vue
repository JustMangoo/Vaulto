<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ol
    data-slot="breadcrumb-list"
    class="breadcrumb-list"
    :class="cn(props.class)"
  >
    <slot />
  </ol>
</template>

<style lang="scss" scoped>
.breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.375rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
    color: var(--muted-foreground);
    overflow-wrap: break-word;

    @media (min-width: 640px) {
        gap: 0.625rem;
    }
}
</style>
