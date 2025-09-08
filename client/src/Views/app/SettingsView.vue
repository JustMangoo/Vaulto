<template>
  <div class="settings">
    <h2>Settings</h2>
    <BaseButton showText @click="toggleTheme">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { useTheme } from "../../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.settings {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
