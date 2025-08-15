<template>
  <div class="app-layout">
    <SideNav />
    <main><router-view /></main>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  flex-direction: row;
}

main {
  padding-top: 1em;
  flex: 1;
  overflow-y: auto;
}
</style>
