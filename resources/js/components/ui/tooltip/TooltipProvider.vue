<script setup lang="ts">
// Shares a hover-open delay across every Tooltip nested inside it. Reka-ui's
// TooltipProvider also coordinated "skip delay on rapid re-hover" behaviour
// between sibling tooltips; that's a nice-to-have we're leaving out for now,
// each tooltip just uses its own delay independently.
import { provide, ref, watch } from 'vue'
import { TOOLTIP_DELAY_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    delayDuration?: number
}>(), {
    delayDuration: 700,
})

const delayDuration = ref(props.delayDuration)
watch(() => props.delayDuration, (value) => { delayDuration.value = value })

provide(TOOLTIP_DELAY_INJECTION_KEY, delayDuration)
</script>

<template>
    <slot />
</template>
