<template>
  <Popup
    :model-value="props.modelValue"
    title="Website Under Development"
    primary-text="Continue"
    @update:modelValue="onUpdateModelValue"
    @primary="handleContinue"
  >
    <p class="message">
      This project is still a work in progress. Features may be incomplete or subject to change.
    </p>
  </Popup>
</template>

<script setup lang="ts">
import Popup from "@/components/Popup.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "continue"): void;
}>();

function onUpdateModelValue(value: boolean) {
  emit("update:modelValue", value);
}

function handleContinue() {
  emit("continue");
  emit("update:modelValue", false);
}
</script>

<style scoped>
.message {
  margin: 0;
  color: var(--color-text-muted, #4b5563);
  line-height: 1.6;
}
</style>
