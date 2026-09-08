<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    class="checkbox"
    :class="cn(props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="checkbox__indicator"
    >
      <slot v-bind="slotProps">
        <Check class="checkbox__icon" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss" scoped>
.checkbox {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid var(--input);
    background: transparent;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    cursor: pointer;
    transition: box-shadow 150ms;

    &:focus-visible {
        outline: none;
        border-color: var(--ring);
        box-shadow: 0 0 0 3px var(--ring);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &[data-state='checked'] {
        background: var(--primary);
        border-color: var(--primary);
        color: var(--primary-foreground);
    }

    &__indicator {
        display: grid;
        place-content: center;
        color: currentColor;
    }

    &__icon {
        width: 0.875rem;
        height: 0.875rem;
    }
}
</style>
