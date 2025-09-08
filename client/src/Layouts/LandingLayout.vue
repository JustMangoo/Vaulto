<template>
  <div class="landing-layout">
    <PublicNav />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import PublicNav from "../components/PublicNav.vue";
</script>
