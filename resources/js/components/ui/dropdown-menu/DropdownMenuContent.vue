<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject, nextTick, ref, watch } from 'vue'
import { useDismissable } from '@/composables/useDismissable'
import { useFloatingPosition, type FloatingAlign, type FloatingSide } from '@/composables/useFloatingPosition'
import { cn } from '@/lib/utils'
import { DROPDOWN_MENU_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
    side?: FloatingSide
    align?: FloatingAlign
    sideOffset?: number
    alignOffset?: number
}>(), {
    side: 'bottom',
    align: 'center',
    sideOffset: 4,
    alignOffset: 0,
})

const ctx = inject(DROPDOWN_MENU_INJECTION_KEY)
if (!ctx) throw new Error('DropdownMenuContent must be used within a DropdownMenu')

const contentEl = ref<HTMLElement | null>(null)

const { style, placedSide } = useFloatingPosition(ctx.triggerEl, contentEl, () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    alignOffset: props.alignOffset,
}))

useDismissable(contentEl, [ctx.triggerEl], () => ctx!.setOpen(false))

watch(() => ctx!.open.value, async (isOpen) => {
    if (!isOpen) return
    await nextTick()
    contentEl.value?.focus()
})
</script>

<template>
    <Teleport to="body">
        <div
            v-if="ctx.open.value"
            ref="contentEl"
            data-slot="dropdown-menu-content"
            data-state="open"
            :data-side="placedSide"
            role="menu"
            tabindex="-1"
            class="dropdown-menu-content"
            :class="cn(props.class)"
            :style="style"
        >
            <slot />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.dropdown-menu-content {
    z-index: 50;
    min-width: 8rem;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    padding: 0.25rem;
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%);
    outline: none;
}
</style>
