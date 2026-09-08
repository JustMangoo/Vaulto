import type { InjectionKey, Ref } from 'vue'

export interface SelectContext {
    open: Ref<boolean>
    setOpen: (value: boolean) => void
    value: Ref<string | undefined>
    setValue: (value: string) => void
    triggerEl: Ref<HTMLElement | null>
    triggerWidth: Ref<number>
}

export const SELECT_INJECTION_KEY: InjectionKey<SelectContext> = Symbol('Select')
