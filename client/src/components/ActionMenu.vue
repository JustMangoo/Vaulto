<template>
  <div class="menu" :style="menuStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  position?: "top" | "bottom" | "left" | "right";
  align?: "left" | "center" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  position: "right",
  align: "left",
});

const menuStyle = computed(() => {
  const offset = "8px";
  const style: Record<string, string> = {};

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
    default:
      style.left = `calc(100% + ${offset})`;
  }

  if (props.position === "top" || props.position === "bottom") {
    if (props.align === "left") {
      style.left = "0";
    } else if (props.align === "center") {
      style.left = "50%";
      style.transform = "translateX(-50%)";
    } else if (props.align === "right") {
      delete style.left;
      style.right = "0";
    }
  } else {
    if (props.align === "left") {
      style.top = "0";
    } else if (props.align === "center") {
      style.top = "50%";
      style.transform = "translateY(-50%)";
    } else if (props.align === "right") {
      delete style.top;
      style.bottom = "0";
    }
  }

  return style;
});
</script>

<style scoped>
.menu {
  position: absolute;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.menu a,
.menu button {
  text-align: left;
  padding: 4px 8px;
  text-decoration: none;
  color: var(--color-text);
  background: none;
  border: none;
  cursor: pointer;
}

.menu a:hover,
.menu button:hover {
  background-color: var(--color-surface-alt);
}
</style>

