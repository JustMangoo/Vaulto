import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

/**
 * Closes an open popover/menu on outside click or Escape, replacing reka-ui's
 * DismissableLayer for our hand-rolled popper components.
 *
 * `ignoreEls` should include the trigger element(s) so clicking the trigger
 * itself doesn't fire an outside-click dismiss on the same interaction that
 * opened it.
 */
export function useDismissable(
    contentEl: Ref<HTMLElement | null | undefined>,
    ignoreEls: Array<Ref<HTMLElement | null | undefined>>,
    onDismiss: () => void,
) {
    onClickOutside(contentEl, (event) => {
        const target = event.target as Node | null
        if (target) {
            for (const el of ignoreEls) {
                if (el.value && el.value.contains(target)) return
            }
        }
        onDismiss()
    })

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') onDismiss()
    }

    onMounted(() => document.addEventListener('keydown', handleKeydown))
    onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
}
