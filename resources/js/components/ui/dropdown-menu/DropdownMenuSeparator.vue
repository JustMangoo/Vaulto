<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <div
        data-slot="dropdown-menu-separator"
        role="separator"
        aria-orientation="horizontal"
        class="dropdown-menu-separator"
        :class="cn(props.class)"
    />
</template>

<style lang="scss" scoped>
.dropdown-menu-separator {
    margin: 0.25rem -0.25rem;
    height: 1px;
    background: var(--border);
}
</style>
