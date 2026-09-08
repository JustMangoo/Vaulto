<script setup lang="ts">
// Root: holds open state and the trigger element reference. Renders no DOM
// element of its own (matches the original reka-ui behaviour), so it never
// interferes with layouts that expect Trigger's child to be their only child
// (e.g. SidebarMenuItem in NavUser.vue).
import { provide, ref } from 'vue'
import { DROPDOWN_MENU_INJECTION_KEY } from './context'

const open = ref(false)
const triggerEl = ref<HTMLElement | null>(null)

function setOpen(value: boolean) {
    open.value = value
}

provide(DROPDOWN_MENU_INJECTION_KEY, { open, setOpen, triggerEl })
</script>

<template>
    <slot />
</template>
