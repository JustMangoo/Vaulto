<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="innerValue"
      class="base-input"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "tel"
  | "url"
  | "date"
  | "time";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: InputType;
    placeholder?: string;
    label?: string;
    id?: string;
  }>(),
  {
    type: "text",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
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
.input-container {
  display: flex;
  align-self: stretch;
  flex-direction: column;
  gap: var(--spacing-xs);
  font-size: var(--font-size-base);
}

.base-input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-width-base) solid transparent;
  border-radius: var(--radius-xs);
  background: var(--color-light);
  color: var(--color-text);
  outline: none;
  font-size: var(--font-size-base);
  transition: all var(--transition-base);

  &:focus {
    border: var(--border-width-base) solid var(--color-primary);
  }
}

.input-label {
  font-weight: var(--font-weight-semibold);
}
</style>
