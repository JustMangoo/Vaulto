<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"
import { AvatarImage } from "reka-ui"

const props = defineProps<AvatarImageProps>()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="props"
    class="avatar-image"
  >
    <slot />
  </AvatarImage>
</template>

<style lang="scss" scoped>
.avatar-image {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
