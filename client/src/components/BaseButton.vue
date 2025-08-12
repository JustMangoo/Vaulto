<template>
  <button class="base-btn" @click="$emit('click', $event)">
    <!-- Icon from prop or slot -->
    <span v-if="showIcon" class="btn-icon">
      <component v-if="iconName" :is="iconComponent" class="icon" />
      <slot v-else name="icon"></slot>
    </span>

    <!-- Text -->
    <span v-if="showText" class="btn-text">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";
import type { Component } from "vue";

const props = defineProps<{
  showIcon?: boolean;
  showText?: boolean;
  iconName?: keyof typeof icons;
}>();

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const showIcon = props.showIcon ?? true;
const showText = props.showText ?? true;

// Ensure TypeScript treats icon as a generic Vue component
const iconComponent = computed<Component | null>(() => {
  if (!props.iconName) return null;
  return icons[props.iconName] as Component;
});
</script>

<style scoped>
.base-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-surface-alt);
  color: var(--color-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-icon {
  display: flex;
  align-items: center;
}

.icon {
  width: 16px;
  height: 16px;
}

.btn-text {
  white-space: nowrap;
  text-align: center;
}
</style>
