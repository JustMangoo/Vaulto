<template>
  <div class="app-layout">
    <SideNav />
    <main><router-view /></main>
    <div class="app-background"><div class="app-background-inner"></div></div>
    <div ref="follower" class="follower"></div>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const follower = ref<HTMLDivElement | null>(null);

let mouseX = 0,
  mouseY = 0; // target position
let currentX = 0,
  currentY = 0; // current circle position
const speed = 0.1; // smoothness (lower = more delay)

function animate() {
  if (follower.value) {
    const rect = follower.value.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    follower.value.style.transform = `translate(${currentX - offsetX}px, ${
      currentY - offsetY
    }px)`;
  }

  requestAnimationFrame(animate);
}

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  flex-direction: row;
}

main {
  flex: 1;
  overflow-y: auto;
}

.app-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5rem;

  .app-background-inner {
    width: 100%;
    height: 100%;
    background: var(--color-border);
    border-radius: 8px;
    filter: blur(1.5rem);
    position: relative;
  }

  /* grain overlay */
}

.follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: var(--color-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  filter: blur(1.5rem);
}
</style>
