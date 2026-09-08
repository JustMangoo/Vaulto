<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    class="separator"
    :class="cn(props.class)"
  />
</template>

<style lang="scss" scoped>
.separator {
    flex-shrink: 0;
    background: var(--border);

    &[data-orientation='horizontal'] {
        height: 1px;
        width: 100%;
    }

    &[data-orientation='vertical'] {
        height: 100%;
        width: 1px;
    }
}
</style>
