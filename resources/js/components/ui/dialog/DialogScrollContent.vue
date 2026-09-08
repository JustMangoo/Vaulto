<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { X } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="dialog-scroll-overlay">
      <DialogContent
        class="dialog-scroll-content"
        :class="cn(props.class)"
        v-bind="{ ...$attrs, ...forwarded }"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose class="dialog-scroll-content__close">
          <X class="dialog-scroll-content__close-icon" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<style lang="scss" scoped>
.dialog-scroll-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: center;
    overflow-y: auto;
    background: rgb(0 0 0 / 80%);
}

.dialog-scroll-content {
    position: relative;
    z-index: 50;
    display: grid;
    width: 100%;
    max-width: 32rem;
    margin: 2rem 0;
    gap: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--background);
    padding: 1.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%);

    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: inline-flex;
        border-radius: var(--radius-md);
        border: none;
        background: transparent;
        padding: 0.125rem;
        cursor: pointer;
        transition: background 150ms;

        &:hover {
            background: var(--secondary);
        }
    }

    &__close-icon {
        width: 1rem;
        height: 1rem;
    }
}
</style>
