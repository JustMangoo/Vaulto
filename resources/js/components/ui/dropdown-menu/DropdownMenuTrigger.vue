<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import Slot from '@/components/ui/_shared/Slot.vue'
import { DROPDOWN_MENU_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    asChild?: boolean
    class?: HTMLAttributes['class']
}>(), {
    asChild: false,
})

const ctx = inject(DROPDOWN_MENU_INJECTION_KEY)
if (!ctx) throw new Error('DropdownMenuTrigger must be used within a DropdownMenu')

function setRef(el: unknown) {
    ctx!.triggerEl.value = (el as { $el?: HTMLElement } | HTMLElement | null) instanceof HTMLElement
        ? (el as HTMLElement)
        : ((el as { $el?: HTMLElement } | null)?.$el ?? null)
}

function handleClick() {
    ctx!.setOpen(!ctx!.open.value)
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        ctx!.setOpen(true)
    }
}
</script>

<template>
    <Slot
        v-if="asChild"
        :ref="setRef"
        data-slot="dropdown-menu-trigger"
        :data-state="ctx.open.value ? 'open' : 'closed'"
        aria-haspopup="menu"
        :aria-expanded="ctx.open.value"
        :class="props.class"
        @click="handleClick"
        @keydown="handleKeydown"
    >
        <slot />
    </Slot>
    <button
        v-else
        :ref="setRef"
        type="button"
        data-slot="dropdown-menu-trigger"
        :data-state="ctx.open.value ? 'open' : 'closed'"
        aria-haspopup="menu"
        :aria-expanded="ctx.open.value"
        :class="props.class"
        @click="handleClick"
        @keydown="handleKeydown"
    >
        <slot />
    </button>
</template>
