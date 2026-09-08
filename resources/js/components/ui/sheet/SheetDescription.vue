<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogDescription } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogDescription
    data-slot="sheet-description"
    class="sheet-description"
    :class="cn(props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogDescription>
</template>

<style lang="scss" scoped>
.sheet-description {
    font-size: 0.875rem;
    color: var(--muted-foreground);
}
</style>
