<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <input
        v-model="modelValue"
        data-slot="input"
        class="input"
        :class="cn(props.class)"
    />
</template>

<style lang="scss" scoped>
.input {
    display: flex;
    height: 2.25rem;
    width: 100%;
    border-radius: var(--radius-md);
    border: 1px solid var(--input);
    background: var(--background);
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    outline: none;
    transition:
        border-color 150ms,
        box-shadow 150ms;

    &:focus-visible {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px var(--ring);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
