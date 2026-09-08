<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
    <div data-slot="dropdown-menu-group" role="group">
        <slot />
    </div>
</template>
