<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { SELECT_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
    size?: 'sm' | 'default'
}>(), {
    size: 'default',
})

const ctx = inject(SELECT_INJECTION_KEY)
if (!ctx) throw new Error('SelectTrigger must be used within a Select')

function setRef(el: unknown) {
    ctx!.triggerEl.value = el instanceof HTMLElement ? el : null
}

function toggle() {
    ctx!.setOpen(!ctx!.open.value)
}
</script>

<template>
    <button
        :ref="setRef"
        type="button"
        data-slot="select-trigger"
        :data-size="size"
        :data-state="ctx.open.value ? 'open' : 'closed'"
        :data-placeholder="!ctx.value.value ? '' : undefined"
        class="select-trigger"
        :class="cn(props.class)"
        @click="toggle"
    >
        <slot />
        <ChevronDown class="select-trigger__chevron" />
    </button>
</template>

<style lang="scss" scoped>
.select-trigger {
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--input);
    background: transparent;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
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

    &[data-placeholder] {
        color: var(--muted-foreground);
    }

    &[data-size='default'] {
        height: 2.25rem;
    }

    &[data-size='sm'] {
        height: 2rem;
    }

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        pointer-events: none;
        color: var(--muted-foreground);
    }

    &__chevron {
        width: 1rem;
        height: 1rem;
        opacity: 0.5;
    }
}
</style>
