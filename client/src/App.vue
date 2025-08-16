<template>
  <router-view />
</template>

<script setup lang="ts">
defineOptions({ name: "App" });
</script>

<style>
/* Optional: global styles */
body {
  background: var(--color-bg);
}

html {
  font-size: 14px;
}
</style>
