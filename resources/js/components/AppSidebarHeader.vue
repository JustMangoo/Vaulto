<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem } from '@/types';

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItem[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);
</script>

<template>
    <header class="app-sidebar-header">
        <div class="app-sidebar-header__left">
            <SidebarTrigger class="app-sidebar-header__trigger" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-sidebar-header {
    display: flex;
    height: 4rem;
    flex-shrink: 0;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--sidebar-border);
    padding: 0 1.5rem;
    transition:
        width 150ms linear,
        height 150ms linear;

    @media (min-width: 768px) {
        padding: 0 1rem;
    }

    &__left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__trigger {
        margin-left: -0.25rem;
    }
}
</style>
