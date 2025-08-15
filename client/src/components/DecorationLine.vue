<script setup lang="ts">
import { computed } from "vue";

type Orientation = "horizontal" | "vertical";

const props = withDefaults(
  defineProps<{
    /** Direction of the line */
    orientation?: Orientation;
    /** Thickness of the line (height for horizontal, width for vertical) */
    thickness?: string;
    /** Length of the line (width for horizontal, height for vertical) */
    length?: string;
    /** Fade distance on each faded edge */
    cap?: string;
    /** Fade the “start” edge? (left for horizontal, top for vertical) */
    fadeStart?: boolean;
    /** Fade the “end” edge? (right for horizontal, bottom for vertical) */
    fadeEnd?: boolean;
    /** Color of the line; use CSS vars like "var(--color-text)" */
    color?: string;
    /** Corners to display */
    corners?: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
    /** Size of each corner */
    cornerSize?: string;
    /** Extra classes for the root element */
    class?: string;
  }>(),
  {
    orientation: "horizontal",
    thickness: "2px",
    length: "100%",
    cap: "60px",
    fadeStart: true,
    fadeEnd: true,
    color: "var(--color-border)",
    corners: () => [],
    cornerSize: "40px",
  }
);

const style = computed(() => {
  const isH = props.orientation === "horizontal";

  // For convenience in the background-size math
  const startCap = props.fadeStart ? props.cap : "0px";
  const endCap = props.fadeEnd ? props.cap : "0px";

  // Build background layers
  const layers: string[] = [];

  if (isH) {
    // Left fade (start)
    if (props.fadeStart) {
      layers.push(
        `linear-gradient(to right, transparent, currentColor) left / ${props.cap} 100% no-repeat`
      );
    }
    // Right fade (end)
    if (props.fadeEnd) {
      layers.push(
        `linear-gradient(to left, transparent, currentColor) right / ${props.cap} 100% no-repeat`
      );
    }
    // Middle solid segment (fills remaining width)
    layers.push(
      `linear-gradient(currentColor, currentColor) ${startCap} 0 / calc(100% - (${startCap} + ${endCap})) 100% no-repeat`
    );
  } else {
    // Top fade (start)
    if (props.fadeStart) {
      layers.push(
        `linear-gradient(to bottom, transparent, currentColor) top / 100% ${props.cap} no-repeat`
      );
    }
    // Bottom fade (end)
    if (props.fadeEnd) {
      layers.push(
        `linear-gradient(to top, transparent, currentColor) bottom / 100% ${props.cap} no-repeat`
      );
    }
    // Middle solid segment (fills remaining height)
    layers.push(
      `linear-gradient(currentColor, currentColor) 0 ${startCap} / 100% calc(100% - (${startCap} + ${endCap})) no-repeat`
    );
  }

  // Inline sizing based on orientation
  const sizeStyles = isH
    ? { width: props.length, height: props.thickness }
    : { width: props.thickness, height: props.length };

  return {
    ...sizeStyles,
    display: "block",
    overflow: "hidden",
    position: "relative",
    // Set the element color so gradients can use currentColor reliably
    color: props.color,
    // Helpful for high-DPI crispness on thin lines
    transform: "translateZ(0)",
    // Compose the backgrounds
    background: layers.join(", "),
  } as Record<string, string>;
});
</script>

<template>
  <div
    :class="['decoration-line', props.class]"
    :style="style"
    role="presentation"
    aria-hidden="true"
  >
    <span
      v-for="corner in props.corners"
      :key="corner"
      :class="['corner', corner]"
      :style="{ '--corner-size': props.cornerSize }"
    />
  </div>
</template>

<style scoped>
/* Optional: prevent the line from collapsing if placed in flex containers */
.decoration-line {
  flex: 0 0 auto;
  z-index: 0;
}

.corner {
  width: var(--corner-size);
  height: var(--corner-size);
  position: absolute;
  overflow: hidden;
}
.corner::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: 50%;
}
.corner.top-left {
  top: 0;
  left: 0;
}
.corner.top-left::before {
  top: 0;
  left: 0;
  box-shadow: calc(-1 * var(--corner-size) / 2) calc(-1 * var(--corner-size) / 2) 0 0 currentColor;
}
.corner.top-right {
  top: 0;
  right: 0;
}
.corner.top-right::before {
  top: 0;
  right: 0;
  box-shadow: calc(var(--corner-size) / 2) calc(-1 * var(--corner-size) / 2) 0 0 currentColor;
}
.corner.bottom-left {
  bottom: 0;
  left: 0;
}
.corner.bottom-left::before {
  bottom: 0;
  left: 0;
  box-shadow: calc(-1 * var(--corner-size) / 2) calc(var(--corner-size) / 2) 0 0 currentColor;
}
.corner.bottom-right {
  bottom: 0;
  right: 0;
}
.corner.bottom-right::before {
  bottom: 0;
  right: 0;
  box-shadow: calc(var(--corner-size) / 2) calc(var(--corner-size) / 2) 0 0 currentColor;
}
</style>
