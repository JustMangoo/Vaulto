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
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps & { class?: HTMLAttributes["class"], showCloseButton?: boolean }>(), {
  showCloseButton: true,
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      class="dialog-content"
      :class="cn(props.class)"
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        data-slot="dialog-close"
        class="dialog-content__close"
      >
        <X />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss" scoped>
.dialog-content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 50;
    display: grid;
    gap: 1rem;
    width: 100%;
    max-width: calc(100% - 2rem);
    transform: translate(-50%, -50%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    padding: 1.5rem;
    background: var(--background);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);

    @media (min-width: 640px) {
        max-width: 32rem;
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
            background: var(--accent);
            color: var(--muted-foreground);
        }

        :deep(svg) {
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
            pointer-events: none;
        }
    }
}
</style>
