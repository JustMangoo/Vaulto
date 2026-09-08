import type { CSSProperties, Ref } from 'vue'
import { autoUpdate, computePosition, flip, offset, shift, size, type Placement } from '@floating-ui/dom'
import { onScopeDispose, ref, watchEffect } from 'vue'

export type FloatingSide = 'top' | 'right' | 'bottom' | 'left'
export type FloatingAlign = 'start' | 'center' | 'end'

export interface FloatingOptions {
    side?: FloatingSide
    align?: FloatingAlign
    sideOffset?: number
    alignOffset?: number
}

function toPlacement(side: FloatingSide, align: FloatingAlign): Placement {
    if (align === 'center') return side
    return `${side}-${align}` as Placement
}

/**
 * Positions `floatingEl` relative to `anchorEl` using @floating-ui/dom directly
 * (no reka-ui). Mirrors the side/align/sideOffset/alignOffset vocabulary our
 * components already use so call sites don't need to change shape.
 */
export function useFloatingPosition(
    anchorEl: Ref<HTMLElement | null | undefined>,
    floatingEl: Ref<HTMLElement | null | undefined>,
    getOptions: () => FloatingOptions = () => ({}),
) {
    const style = ref<CSSProperties>({ position: 'fixed', top: '0px', left: '0px', visibility: 'hidden' })
    const availableSize = ref<{ maxHeight: string, maxWidth: string }>({ maxHeight: 'none', maxWidth: 'none' })
    const placedSide = ref<FloatingSide>('bottom')
    const placedAlign = ref<FloatingAlign>('center')

    let stopAutoUpdate: (() => void) | undefined

    function update() {
        const anchor = anchorEl.value
        const floating = floatingEl.value
        if (!anchor || !floating) return

        const { side = 'bottom', align = 'center', sideOffset = 0, alignOffset = 0 } = getOptions()

        computePosition(anchor, floating, {
            placement: toPlacement(side, align),
            strategy: 'fixed',
            middleware: [
                offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
                flip(),
                shift({ padding: 8 }),
                size({
                    padding: 8,
                    apply({ availableHeight, availableWidth }) {
                        availableSize.value = {
                            maxHeight: `${Math.max(availableHeight, 0)}px`,
                            maxWidth: `${Math.max(availableWidth, 0)}px`,
                        }
                    },
                }),
            ],
        }).then(({ x, y, placement }) => {
            const [placedSideValue, placedAlignValue] = placement.split('-') as [FloatingSide, FloatingAlign?]
            style.value = {
                position: 'fixed',
                top: '0px',
                left: '0px',
                transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
                visibility: 'visible',
                maxHeight: availableSize.value.maxHeight,
                maxWidth: availableSize.value.maxWidth,
            }
            placedSide.value = placedSideValue
            placedAlign.value = placedAlignValue ?? 'center'
        })
    }

    watchEffect((onCleanup) => {
        const anchor = anchorEl.value
        const floating = floatingEl.value

        // Read reactive options so prop changes (side/align/offsets) re-trigger.
        getOptions()

        stopAutoUpdate?.()
        stopAutoUpdate = undefined

        if (!anchor || !floating) return

        stopAutoUpdate = autoUpdate(anchor, floating, update)

        onCleanup(() => {
            stopAutoUpdate?.()
            stopAutoUpdate = undefined
        })
    })

    onScopeDispose(() => {
        stopAutoUpdate?.()
    })

    return { style, placedSide, placedAlign }
}
