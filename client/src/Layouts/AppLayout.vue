<template>
  <div class="app-layout">
    <SideNav />
    <TextureBox />
    <main><router-view /></main>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav.vue";
import TextureBox from "@/components/TextureBox.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  flex-direction: row;
}

main {
  flex: 1;
  overflow-y: auto;
}
</style>
