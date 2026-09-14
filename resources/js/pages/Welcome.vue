<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { home, login } from '@/routes';
import { register } from '@/routes';
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="welcome">
        <header class="welcome__header">
            <Link :href="home()" class="welcome__brand">Vaulto</Link>
            <nav class="welcome__nav">
                <Button v-if="$page.props.auth.user" as-child size="sm">
                    <Link :href="home()">Home</Link>
                </Button>
                <template v-else>
                    <Button as-child variant="ghost" size="sm">
                        <Link :href="login()">Log in</Link>
                    </Button>
                    <Button as-child size="sm">
                        <Link :href="register()">Register</Link>
                    </Button>
                </template>
            </nav>
        </header>

        <main class="welcome__main">
            <div class="welcome__hero">
                <h1 class="welcome__title">Let's get started</h1>
                <p class="welcome__lead">
                    Bookmarks save a URL. Vaulto saves the why. It is a personal
                    inspiration vault for creatives — developers, designers,
                    photographers, musicians — who want to capture what moved
                    them, not just where they found it. The URL is secondary.
                    The sensory experience of the saved thing is primary.
                </p>
            </div>
        </main>

        <footer class="welcome__footer">
            <p>Footer</p>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.welcome {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--border);
    }

    &__brand {
        color: var(--foreground);
        font-size: 1.125rem;
        font-weight: 600;
        text-decoration: none;
        letter-spacing: -0.01em;
    }

    &__nav {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__main {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 4rem 1.5rem;
    }

    &__hero {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 42rem;
        text-align: center;
    }

    &__title {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -0.02em;
    }

    &__lead {
        margin: 0;
        color: var(--muted-foreground);
        font-size: 1.0625rem;
        line-height: 1.65;
    }

    &__footer {
        padding: 1.5rem;
        border-top: 1px solid var(--border);
        color: var(--muted-foreground);
        font-size: 0.875rem;
        text-align: center;

        p {
            margin: 0;
        }
    }
}

@media (max-width: 640px) {
    .welcome__title {
        font-size: 2rem;
    }

    .welcome__main {
        padding: 3rem 1.25rem;
    }
}
</style>
