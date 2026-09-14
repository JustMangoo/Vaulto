<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import Heading from '@/components/Heading.vue';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/ui/input/InputError.vue';
import { home } from '@/routes';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Home',
                href: home(),
            },
        ],
    },
});

const selectedFruit = ref<string>('apple');
</script>

<template>
    <Head title="Home" />

    <div class="panel">
        <div>
            <Heading title="Quick gem"></Heading>
            <Form v-slot="{ errors, processing }">
                <div class="input-row">
                    <div class="input-group">
                        <Label for="gem-title">Gem title</Label>
                        <Input
                            id="gem-title"
                            type="text"
                            name="gem-title"
                            required
                            autofocus
                            :tabindex="1"
                            placeholder="e.g. My gem"
                        />
                        <InputError :message="errors.email" />
                    </div>
                    <div class="input-group">
                        <Label for="vault">Vault</Label>
                        <Select v-model="selectedFruit">
                            <SelectTrigger class="w-48">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent
                                side="bottom"
                                align="end"
                                :side-offset="8"
                            >
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry"
                                    >Blueberry</SelectItem
                                >
                                <SelectItem value="orange" disabled
                                    >Orange (Disabled)</SelectItem
                                >
                            </SelectContent>
                        </Select>
                        <InputError :message="errors.vault" />
                    </div>
                </div>
            </Form>
        </div>
        <div class="section">
            <Heading title="Explore" />
            <div class="card-grid">
                <Card>
                    <CardHeader>
                        <CardTitle>Example Card</CardTitle>
                        <CardDescription>
                            This is an example description demonstrating card
                            components.
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
                <Card>
                    <CardContent>
                        <p>This is the main content area of the card.</p>
                        <CardTitle>Example Card</CardTitle>
                    </CardContent>
                    <CardFooter>
                        <Button size="sm">Save changes</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardContent>
                        <p>This is the main content area of the card.</p>
                        <CardTitle>Example Card</CardTitle>
                    </CardContent>
                    <CardFooter>
                        <Button size="sm">Save changes</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardContent>
                        <p>This is the main content area of the card.</p>
                        <CardTitle>Example Card</CardTitle>
                    </CardContent>
                    <CardFooter>
                        <Button size="sm">Save changes</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
</template>

<style>
.input-row {
    display: flex;
    gap: 0.25rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;

    SelectTrigger {
        width: 100%;
    }
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}
</style>
