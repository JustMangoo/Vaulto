<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes["class"]
}>()

const width = computed(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    class="sidebar-menu-skeleton"
    :class="cn(props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="sidebar-menu-skeleton__icon"
      data-sidebar="menu-skeleton-icon"
    />

    <Skeleton
      class="sidebar-menu-skeleton__text"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-menu-skeleton {
    display: flex;
    height: 2rem;
    align-items: center;
    gap: 0.5rem;
    border-radius: var(--radius-md);
    padding: 0 0.5rem;

    &__icon {
        width: 1rem;
        height: 1rem;
        border-radius: var(--radius-md);
    }

    &__text {
        height: 1rem;
        max-width: var(--skeleton-width);
        flex: 1;
    }
}
</style>
