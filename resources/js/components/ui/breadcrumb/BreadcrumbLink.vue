<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "a",
})
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="as"
    :as-child="asChild"
    class="breadcrumb-link"
    :class="cn(props.class)"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss" scoped>
.breadcrumb-link {
    transition: color 150ms;
    text-decoration: none;
    color: inherit;

    &:hover {
        color: var(--foreground);
    }
}
</style>
