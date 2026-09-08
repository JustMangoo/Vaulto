<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <li
        data-slot="navigation-menu-item"
        class="navigation-menu-item"
        :class="cn(props.class)"
    >
        <slot />
    </li>
</template>

<style lang="scss" scoped>
.navigation-menu-item {
    position: relative;
}
</style>
