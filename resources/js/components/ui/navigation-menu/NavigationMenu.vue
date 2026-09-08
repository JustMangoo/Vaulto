<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Real usage (AppHeader.vue) only ever renders NavigationMenu > List > Item
// wrapping a plain Link, no popover Trigger/Content/Viewport behaviour, so
// this is now a plain structural wrapper with no reka-ui and no floating-ui.
const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <nav
        data-slot="navigation-menu"
        class="navigation-menu"
        :class="cn(props.class)"
    >
        <slot />
    </nav>
</template>

<style lang="scss" scoped>
.navigation-menu {
    position: relative;
    display: flex;
    max-width: max-content;
    flex: 1;
    align-items: center;
    justify-content: center;
}
</style>
