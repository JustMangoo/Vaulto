<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, ref } from 'vue'
import { useFloatingPosition, type FloatingAlign, type FloatingSide } from '@/composables/useFloatingPosition'
import { cn } from '@/lib/utils'
import { TOOLTIP_INJECTION_KEY } from './context'

const props = withDefaults(defineProps<{
    class?: HTMLAttributes['class']
    side?: FloatingSide
    align?: FloatingAlign
    sideOffset?: number
    alignOffset?: number
    hidden?: boolean
}>(), {
    side: 'top',
    align: 'center',
    sideOffset: 4,
    alignOffset: 0,
    hidden: false,
})

const ctx = inject(TOOLTIP_INJECTION_KEY)
if (!ctx) throw new Error('TooltipContent must be used within a Tooltip')

const contentEl = ref<HTMLElement | null>(null)

const { style, placedSide } = useFloatingPosition(ctx.triggerEl, contentEl, () => ({
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    alignOffset: props.alignOffset,
}))

const shouldRender = computed(() => ctx!.open.value && !props.hidden)
</script>

<template>
    <Teleport to="body">
        <div
            v-if="shouldRender"
            ref="contentEl"
            data-slot="tooltip-content"
            role="tooltip"
            :data-side="placedSide"
            class="tooltip-content"
            :class="cn(props.class)"
            :style="style"
        >
            <slot />
            <div class="tooltip-content__arrow" :data-side="placedSide" />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.tooltip-content {
    z-index: 50;
    width: fit-content;
    border-radius: var(--radius-md);
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    text-wrap: balance;
    background: var(--foreground);
    color: var(--background);

    &__arrow {
        position: absolute;
        z-index: 50;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 2px;
        background: var(--foreground);

        &[data-side='top'] {
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
        }

        &[data-side='bottom'] {
            top: -3px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
        }

        &[data-side='left'] {
            right: -3px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
        }

        &[data-side='right'] {
            left: -3px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
        }
    }
}
</style>
