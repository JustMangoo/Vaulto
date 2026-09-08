<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <ul
        data-slot="navigation-menu-list"
        class="navigation-menu-list"
        :class="cn(props.class)"
    >
        <slot />
    </ul>
</template>

<style lang="scss" scoped>
.navigation-menu-list {
    display: flex;
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
}
</style>
