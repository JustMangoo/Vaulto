<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { OTPInputEmits, OTPInputProps } from "vue-input-otp"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { OTPInput } from "vue-input-otp"
import { cn } from "@/lib/utils"

const props = defineProps<OTPInputProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<OTPInputEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="forwarded"
    :container-class="cn('input-otp-container', props.class)"
    data-slot="input-otp"
    class="input-otp"
  >
    <slot v-bind="slotProps" />
  </OTPInput>
</template>

<style lang="scss" scoped>
.input-otp {
    &:disabled {
        cursor: not-allowed;
    }
}

.input-otp-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:has(:disabled) {
        opacity: 0.5;
    }
}
</style>
