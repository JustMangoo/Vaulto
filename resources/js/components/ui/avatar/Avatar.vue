<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { AvatarRoot } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    class="avatar"
    :class="cn(props.class)"
  >
    <slot />
  </AvatarRoot>
</template>

<style lang="scss" scoped>
.avatar {
    position: relative;
    display: flex;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 9999px;
}
</style>
