<script setup lang="ts">
import { inject } from 'vue'
import { SELECT_INJECTION_KEY } from './context'

const props = defineProps<{
    placeholder?: string
}>()

const ctx = inject(SELECT_INJECTION_KEY)
if (!ctx) throw new Error('SelectValue must be used within a Select')
</script>

<template>
    <span data-slot="select-value">
        <slot>{{ ctx.value.value ?? placeholder }}</slot>
    </span>
</template>
