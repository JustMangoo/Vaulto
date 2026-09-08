import type { InjectionKey, Ref } from 'vue'

export interface DropdownMenuContext {
    open: Ref<boolean>
    setOpen: (value: boolean) => void
    triggerEl: Ref<HTMLElement | null>
}

export const DROPDOWN_MENU_INJECTION_KEY: InjectionKey<DropdownMenuContext> = Symbol('DropdownMenu')
