<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id" class="select-label">{{ label }}</label>
    <select
      :id="id"
      v-model="innerValue"
      class="base-select"
      v-bind="$attrs"
    >
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
import { ref, watch, defineProps, defineEmits } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number | null
  options: SelectOption[]
  placeholder?: string
  label?: string
  id?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  val => {
    innerValue.value = val
  }
)

watch(innerValue, val => {
  emit('update:modelValue', val)
})
</script>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-select {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

.select-label {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
