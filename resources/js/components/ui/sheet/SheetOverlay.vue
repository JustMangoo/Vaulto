<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogOverlay } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogOverlay
    data-slot="sheet-overlay"
    class="sheet-overlay"
    :class="cn(props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogOverlay>
</template>

<style lang="scss" scoped>
.sheet-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgb(0 0 0 / 80%);
}
</style>
