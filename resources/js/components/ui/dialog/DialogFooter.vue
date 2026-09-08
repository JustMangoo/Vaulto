<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { DialogClose } from "reka-ui"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  showCloseButton?: boolean
}>(), {
  showCloseButton: false,
})
</script>

<template>
  <div
    data-slot="dialog-footer"
    class="dialog-footer"
    :class="cn(props.class)"
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline">
        Close
      </Button>
    </DialogClose>
  </div>
</template>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: flex-end;
    }
}
</style>
