<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardProps } from "reka-ui"
import { computed } from "vue"
import { useVueOTPContext } from "vue-input-otp"
import { cn } from "@/lib/utils"

const props = defineProps<{ index: number, class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)

const context = useVueOTPContext()

const slot = computed(() => context?.value.slots[props.index])
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    class="input-otp-slot"
    :class="cn(props.class)"
  >
    {{ slot?.char }}
    <div v-if="slot?.hasFakeCaret" class="input-otp-slot__caret">
      <div class="input-otp-slot__caret-bar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-otp-slot {
    position: relative;
    display: flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--input);
    border-bottom: 1px solid var(--input);
    border-right: 1px solid var(--input);
    font-size: 0.875rem;
    outline: none;
    transition: all 150ms;

    &:first-child {
        border-left: 1px solid var(--input);
        border-top-left-radius: var(--radius-md);
        border-bottom-left-radius: var(--radius-md);
    }

    &:last-child {
        border-top-right-radius: var(--radius-md);
        border-bottom-right-radius: var(--radius-md);
    }

    &[data-active='true'] {
        z-index: 10;
        border-color: var(--ring);
        box-shadow: 0 0 0 3px var(--ring);
    }

    &__caret {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    &__caret-bar {
        height: 1rem;
        width: 1px;
        background: var(--foreground);
        animation: input-otp-caret-blink 1s step-end infinite;
    }
}

@keyframes input-otp-caret-blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>
