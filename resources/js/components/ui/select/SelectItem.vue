<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { SELECT_INJECTION_KEY } from './context'

const props = defineProps<{
    value: string
    class?: HTMLAttributes['class']
    disabled?: boolean
}>()

const ctx = inject(SELECT_INJECTION_KEY)
if (!ctx) throw new Error('SelectItem must be used within a Select')

const isSelected = computed(() => ctx!.value.value === props.value)

function handleClick() {
    if (props.disabled) return
    ctx!.setValue(props.value)
}
</script>

<template>
    <div
        data-slot="select-item"
        role="option"
        :aria-selected="isSelected"
        :data-disabled="disabled ? '' : undefined"
        class="select-item"
        :class="cn(props.class)"
        @click="handleClick"
    >
        <span class="select-item__indicator">
            <Check v-if="isSelected" class="select-item__icon" />
        </span>
        <span><slot /></span>
    </div>
</template>

<style lang="scss" scoped>
.select-item {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.5rem;
    border-radius: 2px;
    padding: 0.375rem 2rem 0.375rem 0.5rem;
    font-size: 0.875rem;
    outline: none;
    cursor: default;
    user-select: none;

    &:hover {
        background: var(--accent);
        color: var(--accent-foreground);
    }

    &[data-disabled] {
        pointer-events: none;
        opacity: 0.5;
    }

    &__indicator {
        position: absolute;
        right: 0.5rem;
        display: flex;
        width: 0.875rem;
        height: 0.875rem;
        align-items: center;
        justify-content: center;
    }

    &__icon {
        width: 1rem;
        height: 1rem;
    }
}
</style>
