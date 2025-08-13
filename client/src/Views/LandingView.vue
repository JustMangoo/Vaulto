<template>
  <div>
    <router-link :to="{ name: 'Login' }">
      <BaseButton showText>Login</BaseButton>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "../components/BaseButton.vue";
</script>

<style scoped></style>
