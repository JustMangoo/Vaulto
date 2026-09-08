<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import Slot from '@/components/ui/_shared/Slot.vue'
import { cn } from '@/lib/utils'
import { DROPDOWN_MENU_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
    asChild?: boolean
    inset?: boolean
    variant?: 'default' | 'destructive'
    disabled?: boolean
}>(), {
    asChild: false,
    variant: 'default',
})

const ctx = inject(DROPDOWN_MENU_INJECTION_KEY)
if (!ctx) throw new Error('DropdownMenuItem must be used within a DropdownMenu')

function handleClick() {
    if (props.disabled) return
    // Let the click (e.g. an inertia <Link>) fire first, then close the menu.
    ctx!.setOpen(false)
}
</script>

<template>
    <component
        :is="asChild ? Slot : 'div'"
        data-slot="dropdown-menu-item"
        role="menuitem"
        :tabindex="disabled ? undefined : -1"
        :data-disabled="disabled ? '' : undefined"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        class="dropdown-menu-item"
        :class="cn(props.class)"
        @click="handleClick"
    >
        <slot />
    </component>
</template>

<style lang="scss" scoped>
.dropdown-menu-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 2px;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    outline: none;
    cursor: default;
    user-select: none;

    &:focus,
    &:hover {
        background: var(--accent);
        color: var(--accent-foreground);
    }

    &[data-disabled] {
        pointer-events: none;
        opacity: 0.5;
    }

    &[data-inset] {
        padding-left: 2rem;
    }

    &[data-variant='destructive'] {
        color: var(--destructive);

        &:focus,
        &:hover {
            background: var(--destructive);
            color: white;
        }
    }

    :deep(svg) {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        pointer-events: none;
        color: var(--muted-foreground);
    }
}
</style>
