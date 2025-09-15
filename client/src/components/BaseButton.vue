<template>
  <button
    class="base-btn"
    :class="[variantClass, full ? 'btn-full' : '']"
    @click="$emit('click', $event)"
  >
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

const props = withDefaults(
  defineProps<{
    showIcon?: boolean;
    showText?: boolean;
    variant?: "primary" | "secondary";
    full?: boolean;
    iconName?: keyof typeof icons;
  }>(),
  {
    showIcon: false,
    showText: true,
    variant: "primary",
    full: false,
  }
);

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

const variantClass = computed(() => {
  return props.variant === "secondary" ? "btn-secondary" : "btn-primary";
});
</script>

<style scoped>
.base-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-width-base) solid var(--color-primary);
  border-radius: var(--radius-xs);
  cursor: pointer;
  font-size: var(--font-size-base);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text);
}
.btn-secondary {
  background-color: var(--color-light);
  color: var(--color-text);
}

.btn-full {
  width: 100%;
}

.btn-icon {
  display: flex;
  align-items: center;
}

.icon {
  width: var(--font-size-sm);
  height: var(--font-size-sm);
}

.btn-text {
  white-space: nowrap;
  text-align: center;
  font-weight: var(--font-weight-semibold);
}
</style>
