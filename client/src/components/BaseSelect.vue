<template>
  <div class="select-container">
    <label v-if="label" :for="id" class="select-label">{{ label }}</label>
    <select :id="id" v-model="innerValue" class="base-select" v-bind="$attrs">
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

export interface SelectOption {
  label: string;
  value: string | number;
}

const props = defineProps<{
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();

const innerValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val;
  }
);

watch(innerValue, (val) => {
  emit("update:modelValue", val);
});
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.base-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  background: var(--color-bg);
  color: var(--color-text);
}

.select-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}
</style>
