<template>
  <div v-if="modelValue" class="popup-overlay" @click.self="close">
    <div class="popup-container">
      <header class="popup-header">
        <h3 class="popup-title">{{ title }}</h3>
        <button class="popup-close" @click="close">&times;</button>
      </header>
      <section class="popup-body">
        <slot />
      </section>
      <footer v-if="showFooter" class="popup-footer">
        <button
          v-if="secondaryText"
          class="popup-btn secondary"
          @click="$emit('secondary')"
        >
          {{ secondaryText }}
        </button>
        <button
          v-if="primaryText"
          class="popup-btn primary"
          @click="$emit('primary')"
        >
          {{ primaryText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    primaryText?: string;
    secondaryText?: string;
  }>(),
  {
    modelValue: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "primary"): void;
  (e: "secondary"): void;
}>();

const showFooter = computed(() => !!props.primaryText || !!props.secondaryText);

function close() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-container {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  min-width: 300px;
  max-width: 90%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing-sm) + var(--spacing-xs));
}

.popup-title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.popup-close {
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  color: var(--color-text);
}

.popup-body {
  margin-bottom: calc(var(--spacing-sm) + var(--spacing-xs));
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

.popup-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: var(--color-surface-alt);
  color: var(--color-text);
}

.popup-btn.primary {
  background-color: var(--color-primary);
  color: var(--color-bg);
}

.popup-btn.secondary {
  background-color: var(--color-secondary);
}
</style>
