<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { X } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import SheetOverlay from "./SheetOverlay.vue"

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes["class"]
  side?: "top" | "right" | "bottom" | "left"
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: "right",
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "side")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      data-slot="sheet-content"
      class="sheet-content"
      :class="cn(`sheet-content--${side}`, props.class)"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />

      <DialogClose class="sheet-content__close">
        <X class="sheet-content__close-icon" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss" scoped>
.sheet-content {
    position: fixed;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--background);
    box-shadow: -4px 0 15px -3px rgb(0 0 0 / 10%);

    &--right {
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 75%;
        border-left: 1px solid var(--border);

        @media (min-width: 640px) {
            max-width: 24rem;
        }
    }

    &--left {
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 75%;
        border-right: 1px solid var(--border);

        @media (min-width: 640px) {
            max-width: 24rem;
        }
    }

    &--top {
        top: 0;
        left: 0;
        right: 0;
        height: auto;
        border-bottom: 1px solid var(--border);
    }

    &--bottom {
        bottom: 0;
        left: 0;
        right: 0;
        height: auto;
        border-top: 1px solid var(--border);
    }

    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 2px;
        background: transparent;
        padding: 0;
        opacity: 0.7;
        cursor: pointer;
        transition: opacity 150ms;

        &:hover {
            opacity: 1;
        }

        &:focus-visible {
            box-shadow: 0 0 0 2px var(--ring);
        }

        &[data-state='open'] {
            background: var(--secondary);
        }
    }

    &__close-icon {
        width: 1rem;
        height: 1rem;
    }
}
</style>
