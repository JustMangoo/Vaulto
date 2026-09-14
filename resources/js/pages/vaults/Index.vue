<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { index } from '@/routes/vaults';
import { create } from '@/routes/vaults';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Vaults',
                href: index(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Vaults" />
    <Heading title="Vaults" />
    <Link :href="create()"><Button>create a vault</Button></Link>
</template>

<style lang="scss" scoped></style>
