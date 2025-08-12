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
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.settings {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
