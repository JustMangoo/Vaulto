<template>
  <nav>
    <div ref="logoContainer" class="logo-container">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/Temp-Logo.svg" alt="Vaulto Logo" />
      </router-link>
    </div>
    <ul>
      <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>
      <router-link :to="{ name: 'Pricing' }"><li>Pricing</li></router-link>
      <router-link :to="{ name: 'FAQ' }"><li>FAQ</li></router-link>
    </ul>
    <div ref="actionContainer" class="action-container">
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
import { ref, onMounted, onUnmounted } from "vue";
import BaseButton from "./BaseButton.vue";

const logoContainer = ref<HTMLElement | null>(null);
const actionContainer = ref<HTMLElement | null>(null);

let resizeObserver: ResizeObserver;

const updateLogoWidth = () => {
  if (logoContainer.value && actionContainer.value) {
    logoContainer.value.style.width = `${actionContainer.value.offsetWidth}px`;
  }
};

onMounted(() => {
  if (actionContainer.value) {
    resizeObserver = new ResizeObserver(updateLogoWidth);
    resizeObserver.observe(actionContainer.value);
    updateLogoWidth();
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 var(--border-width-deco) var(--border-width-deco)
    var(--border-width-deco);
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
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  align-items: center;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--color-light);
}

.logo-container {
  justify-content: flex-start;
  img {
    height: 100%;
    width: auto;
  }
}

.action-container {
  justify-content: flex-end;
}

ul {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
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
