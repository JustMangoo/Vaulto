<template>
  <div class="dropdown-menu" :style="menuStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Position = "top" | "bottom" | "left" | "right";
type Align = "left" | "center" | "right";

const props = withDefaults(
  defineProps<{ position?: Position; align?: Align }>(),
  {
    position: "bottom",
    align: "left",
  }
);

const menuStyle = computed(() => {
  const style: Record<string, string> = {};
  const offset = "8px";
  switch (props.position) {
    case "top":
      style.bottom = `calc(100% + ${offset})`;
      break;
    case "bottom":
      style.top = `calc(100% + ${offset})`;
      break;
    case "left":
      style.right = `calc(100% + ${offset})`;
      break;
    case "right":
      style.left = `calc(100% + ${offset})`;
      break;
  }

  if (props.position === "top" || props.position === "bottom") {
    if (props.align === "center") {
      style.left = "50%";
      style.transform = "translateX(-50%)";
    } else if (props.align === "right") {
      style.right = "0";
    } else {
      style.left = "0";
    }
  } else {
    if (props.align === "center") {
      style.top = "50%";
      style.transform = "translateY(-50%)";
    } else if (props.align === "right") {
      style.bottom = "0";
    } else {
      style.top = "0";
    }
  }

  return style;
});
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 11;
  border-radius: 4px;

  a,
  button {
    text-align: left;
    padding: 4px 8px;
    text-decoration: none;
    color: var(--color-text);
    background: none;
    border: none;
    cursor: pointer;
  }

  a:hover,
  button:hover {
    background-color: var(--color-surface-alt);
  }
}
</style>
