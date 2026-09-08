import type { InjectionKey, Ref } from 'vue'

export interface TooltipContext {
    open: Ref<boolean>
    triggerEl: Ref<HTMLElement | null>
    show: () => void
    hide: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<TooltipContext> = Symbol('Tooltip')
export const TOOLTIP_DELAY_INJECTION_KEY: InjectionKey<Ref<number>> = Symbol('TooltipDelay')
