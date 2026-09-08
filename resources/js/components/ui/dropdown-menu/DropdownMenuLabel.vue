<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
    inset?: boolean
}>()
</script>

<template>
    <div
        data-slot="dropdown-menu-label"
        :data-inset="inset ? '' : undefined"
        class="dropdown-menu-label"
        :class="cn(props.class)"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.dropdown-menu-label {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;

    &[data-inset] {
        padding-left: 2rem;
    }
}
</style>
