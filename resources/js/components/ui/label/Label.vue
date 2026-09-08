<script setup lang="ts">
import type { LabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Label } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    class="label"
    :class="cn(props.class)"
  >
    <slot />
  </Label>
</template>

<style lang="scss" scoped>
.label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 500;
    user-select: none;

    &[data-disabled='true'] {
        pointer-events: none;
        opacity: 0.5;
    }
}
</style>
