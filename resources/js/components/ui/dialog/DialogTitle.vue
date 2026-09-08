<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogTitle, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    class="dialog-title"
    :class="cn(props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<style lang="scss" scoped>
.dialog-title {
    font-size: 1.125rem;
    line-height: 1;
    font-weight: 600;
}
</style>
