<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { index, create, edit } from '@/routes/vaults';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import type { Flash } from '@/types/ui';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type SharedPageProps = {
    flash?: Flash;
};

interface Vault {
    id: number;
    title: string;
    description: string;
    tag: string;
}

interface Props {
    vaults: Vault[];
}

//get prop from Inertia
const prop = defineProps<Props>();

const page = usePage<SharedPageProps>();

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
    <Alert v-if="page.props.flash?.message">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{{ page.props.flash.message }}</AlertDescription>
    </Alert>

    <div class="card-grid">
        <Card v-for="vault in prop.vaults" :key="vault.id">
            <CardHeader>
                <CardTitle>{{ vault.title }}</CardTitle>
                <CardDescription>
                    {{ vault.description }},
                    {{ vault.tag }}
                </CardDescription>
                <CardAction>
                    <Button variant="outline" size="sm">Action</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>This is the main content area of the card.</p>
            </CardContent>
            <CardFooter>
                <Link :href="edit(vault.id)"
                    ><Button size="sm">edit</Button></Link
                >
                <!-- TODO: wire delete to a vaults.destroy route -->
                <Button size="sm">delete</Button>
            </CardFooter>
        </Card>
    </div>
</template>

<style lang="scss" scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
</style>
