<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div>
        <header>
            <nav>
                <Link
                    v-if="$page.props.auth.user"
                    :href="dashboard()">
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="login()">
                        Log in
                    </Link>
                    <Link
                        :href="register()">
                        Register
                    </Link>
                </template>
            </nav>
        </header>

        <main>
            <div>
                <h1>Let's get started</h1>
                <p>
                    Bookmarks save a URL. Vaulto saves the why. It is a personal inspiration vault for creatives — developers, designers, photographers, musicians — who want to capture what moved them, not just where they found it. The URL is secondary. The sensory experience of the saved thing is primary.
                </p>
            </div>
        </main>

        <footer>
            <p>Footer</p>
        </footer>
    </div>
</template>
