<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AvatarFallback } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    class="avatar-fallback"
    :class="cn(props.class)"
  >
    <slot />
  </AvatarFallback>
</template>

<style lang="scss" scoped>
.avatar-fallback {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background: var(--muted);
}
</style>
