<template>
  <nav>
    <div class="logo-container">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/Temp-Logo.svg" alt="Vaulto Logo" />
      </router-link>
    </div>
    <ul>
      <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>
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
  padding: 0 var(--border-width-deco) var(--border-width-deco)
    var(--border-width-deco);
  align-items: center;
  gap: var(--border-width-deco);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: var(--font-size-base);
}

.logo-container,
.action-container {
  display: flex;
  flex: 0 0 auto;
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  align-items: center;
  align-self: stretch;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--color-light);
}

.logo-container {
  img {
    height: 100%;
    width: auto;
  }
}

.logo-container,
.action-container {
  flex: 1;
  max-width: fit-content;
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  flex: 1;
  align-self: stretch;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--color-light);
}
li {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark-1);
  cursor: pointer;
  transition: color 0.3s ease;
}

li:hover {
  color: var(--color-primary);
}
</style>
