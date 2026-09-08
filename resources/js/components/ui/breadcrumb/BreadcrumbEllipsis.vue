<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { MoreHorizontal } from "@lucide/vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    class="breadcrumb-ellipsis"
    :class="cn(props.class)"
  >
    <slot>
      <MoreHorizontal class="breadcrumb-ellipsis__icon" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>

<style lang="scss" scoped>
.breadcrumb-ellipsis {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
    align-items: center;
    justify-content: center;

    &__icon {
        width: 1rem;
        height: 1rem;
    }
}
</style>
