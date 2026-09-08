<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, ref } from 'vue'
import { useDismissable } from '@/composables/useDismissable'
import { useFloatingPosition, type FloatingAlign, type FloatingSide } from '@/composables/useFloatingPosition'
import { cn } from '@/lib/utils'
import { SELECT_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
    side?: FloatingSide
    align?: FloatingAlign
    sideOffset?: number
}>(), {
    side: 'bottom',
    align: 'start',
    sideOffset: 4,
})

const ctx = inject(SELECT_INJECTION_KEY)
if (!ctx) throw new Error('SelectContent must be used within a Select')

const contentEl = ref<HTMLElement | null>(null)

const { style } = useFloatingPosition(ctx.triggerEl, contentEl, () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
}))

useDismissable(contentEl, [ctx.triggerEl], () => ctx!.setOpen(false))

const contentStyle = computed(() => ({
    ...style.value,
    minWidth: `${ctx!.triggerWidth.value}px`,
}))
</script>

<template>
    <Teleport to="body">
        <div
            v-if="ctx.open.value"
            ref="contentEl"
            data-slot="select-content"
            role="listbox"
            class="select-content"
            :class="cn(props.class)"
            :style="contentStyle"
        >
            <slot />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.select-content {
    position: relative;
    z-index: 50;
    min-width: 8rem;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%);
    padding: 0.25rem;
}
</style>
