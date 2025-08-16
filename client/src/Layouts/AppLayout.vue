<template>
  <div class="app-layout">
    <SideNav />
    <main><router-view /></main>
    <div class="app-background"><div class="app-background-inner"></div></div>
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

.app-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5rem;

  .app-background-inner {
    width: 100%;
    height: 100%;
    background: var(--color-border);
    border-radius: 8px;
    filter: blur(1.5rem);
  }
}
</style>
