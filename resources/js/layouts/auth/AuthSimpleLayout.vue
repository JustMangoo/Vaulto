<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div>
        <div>
            <div>
                <div>
                    <Link :href="home()">
                        <div>
                            <!--                            <AppLogoIcon-->
                            <!--                                class="size-9 fill-current text-[var(&#45;&#45;foreground)] dark:text-white"-->
                            <!--                            />-->
                        </div>
                    </Link>
                    <div>
                        <h1>{{ title }}</h1>
                        <p>
                            {{ description }}
                        </p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
