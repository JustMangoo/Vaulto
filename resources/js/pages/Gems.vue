<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { gems } from '@/routes';
import Heading from '@/components/Heading.vue';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Gems',
                href: gems(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Gems" />
    <Heading title="Gems" />
</template>

<style lang="scss" scoped></style>
