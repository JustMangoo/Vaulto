<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';

const name = usePage().props.name;
</script>

<template>
    <div class="app-logo-icon">
        <AppLogoIcon class="app-logo-icon__glyph" />
    </div>
    <div class="app-logo-text">
        <span class="app-logo-text__name">{{ name }}</span>
    </div>
</template>

<style lang="scss" scoped>
.app-logo-icon {
    display: flex;
    aspect-ratio: 1 / 1;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--sidebar-primary);
    color: var(--sidebar-primary-foreground);

    &__glyph {
        width: 1.25rem;
        height: 1.25rem;
        fill: currentColor;
    }
}

.app-logo-text {
    margin-left: 0.25rem;
    display: grid;
    flex: 1;
    text-align: left;
    font-size: 0.875rem;

    &__name {
        margin-bottom: 0.125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.25;
        font-weight: 600;
    }
}
</style>
