<script setup lang="ts">
import { inject, provide, ref } from 'vue'
import { TOOLTIP_DELAY_INJECTION_KEY, TOOLTIP_INJECTION_KEY } from './context'

const open = ref(false)
const triggerEl = ref<HTMLElement | null>(null)
const delayDuration = inject(TOOLTIP_DELAY_INJECTION_KEY, ref(700))

let showTimeout: ReturnType<typeof setTimeout> | undefined

function show() {
    clearTimeout(showTimeout)
    showTimeout = setTimeout(() => {
        open.value = true
    }, delayDuration.value)
}

function hide() {
    clearTimeout(showTimeout)
    open.value = false
}

provide(TOOLTIP_INJECTION_KEY, { open, triggerEl, show, hide })
</script>

<template>
    <slot />
</template>
