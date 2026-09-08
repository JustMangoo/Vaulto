<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { SELECT_INJECTION_KEY } from './context'

const props = defineProps<{
    modelValue?: string
    defaultValue?: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const open = ref(false)
const triggerEl = ref<HTMLElement | null>(null)
const triggerWidth = ref(0)
const internalValue = ref<string | undefined>(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (next) => {
    if (next !== undefined) internalValue.value = next
})

const value = computed({
    get: () => internalValue.value,
    set: (next: string | undefined) => {
        internalValue.value = next
        if (next !== undefined) emit('update:modelValue', next)
    },
})

function setOpen(next: boolean) {
    open.value = next
    if (next && triggerEl.value) triggerWidth.value = triggerEl.value.offsetWidth
}

function setValue(next: string) {
    value.value = next
    setOpen(false)
}

provide(SELECT_INJECTION_KEY, { open, setOpen, value, setValue, triggerEl, triggerWidth })
</script>

<template>
    <slot />
</template>
