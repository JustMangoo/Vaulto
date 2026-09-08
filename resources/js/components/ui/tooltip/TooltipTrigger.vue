<script setup lang="ts">
import { inject } from 'vue'
import Slot from '@/components/ui/_shared/Slot.vue'
import { TOOLTIP_INJECTION_KEY } from './context'

// Always renders as its child (there's no real-world case here where a
// tooltip trigger needs its own extra DOM element, every usage wraps an
// existing button/link). Accepts `as-child` for call-site compatibility but
// doesn't need to branch on it.
defineProps<{ asChild?: boolean }>()

const ctx = inject(TOOLTIP_INJECTION_KEY)
if (!ctx) throw new Error('TooltipTrigger must be used within a Tooltip')

function setRef(el: unknown) {
    ctx!.triggerEl.value = el instanceof HTMLElement
        ? el
        : ((el as { $el?: HTMLElement } | null)?.$el ?? null)
}
</script>

<template>
    <Slot
        :ref="setRef"
        data-slot="tooltip-trigger"
        :data-state="ctx.open.value ? 'open' : 'closed'"
        @mouseenter="ctx.show"
        @mouseleave="ctx.hide"
        @focus="ctx.show"
        @blur="ctx.hide"
    >
        <slot />
    </Slot>
</template>
