<script setup lang="ts">
import { computed } from 'vue';
import { SidebarInset } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = {
    variant?: AppVariant;
    class?: string;
};

const props = withDefaults(defineProps<Props>(), {
    variant: 'sidebar',
});
const className = computed(() => props.class);
</script>

<template>
    <SidebarInset v-if="props.variant === 'sidebar'" :class="className">
        <slot />
    </SidebarInset>
    <main v-else class="app-content" :class="className">
        <slot />
    </main>
</template>

<style lang="scss" scoped>
.app-content {
    background: var(--background);
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex: 1;
    gap: 1rem;
    border-radius: 1rem;
}
</style>
