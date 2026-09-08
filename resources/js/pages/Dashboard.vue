<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import InputError from '@/components/ui/input/InputError.vue';
import { dashboard } from '@/routes';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: dashboard(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Dashboard" />

    <div class="panel">
        <div>
            <Heading title="Quick gem"></Heading>
            <Form v-slot="{ errors, processing }">
                <div class="input-group">
                    <Label for="gem-title">Gem title</Label>
                    <Input
                        id="gem-title"
                        type="text"
                        name="gem-title"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="email"
                        placeholder="e.g. My gem"
                    />
                    <InputError :message="errors.email" />
                </div>
                <Select> </Select>
            </Form>
        </div>
        <div>
            <Heading title="Explore" />
            <Card>
                <CardHeader>
                    <CardTitle>Example Card</CardTitle>
                    <CardDescription>
                        This is an example description demonstrating card components.
                    </CardDescription>
                    <CardAction>
                        <Button variant="outline" size="sm">Action</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p>This is the main content area of the card.</p>
                </CardContent>
                <CardFooter>
                    <Button size="sm">Save changes</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>

<style>
.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}
</style>
