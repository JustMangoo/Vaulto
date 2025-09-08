<template>
  <nav>
    <div class="logo-container">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/Temp-Logo.svg" alt="Vaulto Logo" />
      </router-link>
    </div>
    <ul>
      <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>
      <router-link :to="{ name: 'About' }"><li>The Vault</li></router-link>
      <router-link :to="{ name: 'Pricing' }"><li>Pricing</li></router-link>
      <router-link :to="{ name: 'FAQ' }"><li>FAQ</li></router-link>
    </ul>
    <div class="action-container">
      <router-link :to="{ name: 'Login' }">
        <BaseButton variant="secondary">Log in</BaseButton>
      </router-link>
      <router-link :to="{ name: 'Register' }">
        <BaseButton>Get Started</BaseButton>
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
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-bg);
}

.logo-container {
  display: flex;
  padding: 0 24px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light);
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light);
}
li {
  font-size: var(--font-size-lg);
  font-weight: 500;
  padding: var(--spacing-md) 0;
  color: var(--color-dark-1);
  cursor: pointer;
  transition: color 0.3s ease;
}

li:hover {
  color: var(--color-primary);
}
.action-container {
  display: flex;
  padding: var(--spacing-lg) 24px;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  align-self: stretch;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background: var(--color-light);
}
</style>
