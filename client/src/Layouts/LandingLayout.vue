<template>
  <div class="landing-layout">
    <PublicNav />
    <router-view />
    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import PublicNav from "../components/PublicNav.vue";
import PublicFooter from "../components/PublicFooter.vue";
</script>

<style>
.landing-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}
</style>
