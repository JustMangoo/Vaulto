<template>
  <nav>
    <div class="logo-wrapper">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/Temp-Logo.svg" alt="Vaulto Logo" />
      </router-link>
    </div>
    <ul></ul>
    <div class="action-wrapper">
      <router-link :to="{ name: 'Login' }">
        <BaseButton showText>Login</BaseButton>
      </router-link>
      <router-link :to="{ name: 'Register' }">
        <BaseButton showText>get Started</BaseButton>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
</script>

<style scoped>
nav {
  display: flex;
  width: 100%;
  padding: 0 var(--border-deco-width) var(--border-deco-width)
    var(--border-deco-width);
  align-items: center;
  gap: var(--border-deco-width);
  border-radius: 0 0 calc(var(--radius-lg)+2px) calc(var(--radius-lg)+2px);
  background: var(--color-bg);
}

.logo-wrapper {
  display: flex;
  padding: 0 24px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light, #fffefd);
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light, #fffefd);
}
.action-wrapper {
  display: flex;
  padding: 20px 24px;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light, #fffefd);
}
</style>
