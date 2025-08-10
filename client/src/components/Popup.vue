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
import { computed, defineProps, withDefaults, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    primaryText?: string
    secondaryText?: string
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

const showFooter = computed(
  () => !!props.primaryText || !!props.secondaryText
)

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-container {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.popup-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.popup-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.popup-body {
  margin-bottom: 12px;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.popup-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-btn.primary {
  background-color: #4caf50;
  color: #fff;
}

.popup-btn.secondary {
  background-color: #ccc;
}
</style>
