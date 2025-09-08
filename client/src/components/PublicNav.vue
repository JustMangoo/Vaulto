<template>
  <nav>
    <div class="logo-wrapper"></div>
    <ul></ul>
    <div class="action-wrapper">
      <router-link :to="{ name: 'Login' }">
        <BaseButton showText>Login</BaseButton>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
nav {
  display: flex;
  width: 1440px;
  padding: 0 1px 1px 1px;
  align-items: center;
  gap: 1px;
}
</style>
