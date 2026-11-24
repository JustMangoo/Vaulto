<script setup lang="ts">
import { Form, Head, useForm } from '@inertiajs/vue3';
import { create, store } from '@/routes/vaults';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/ui/input/InputError.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ref } from 'vue';

const form = useForm({
    title: '',
    description: '',
    tag: 'website',
});

const handleSubmit = () => {
    form.post(store.url());
};

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Create a Vault',
                href: create(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Create a Vault" />
    <Heading title="Create a Vault" />
    Create a vault
    <Form
        @submit.prevent="handleSubmit"
        class="form"
        v-slot="{ errors, processing }"
    >
        <div class="form__group">
            <Label for="vault-title">Vault title</Label>
            <Input
                id="vault-title"
                type="text"
                v-model="form.title"
                name="vault-title"
                required
                autofocus
                :tabindex="1"
                placeholder="e.g. My vault"
            />
            <InputError v-if="form.errors.title" :message="form.errors.title" />
        </div>
        <div class="form__group">
            <Label for="vault-description">Vault description</Label>
            <Input
                id="vault-description"
                type="text"
                v-model="form.description"
                name="vault-description"
                required
                autofocus
                :tabindex="1"
                placeholder="description"
            />
            <InputError
                v-if="form.errors.description"
                :message="form.errors.description"
            />
        </div>
        <div class="form__group">
            <Label for="vault">Vault</Label>
            <Select v-model="form.tag">
                <SelectTrigger class="w-48">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent side="bottom" align="end" :side-offset="8">
                    <SelectItem value="websites">Websites</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="art" disabled>Art (Disabled)</SelectItem>
                </SelectContent>
            </Select>
            <InputError v-if="form.errors.tag" :message="form.errors.tag" />
        </div>
        <Button type="submit" :disabled="form.processing">Add a product</Button>
    </Form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
