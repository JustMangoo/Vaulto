<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-container">
        <p class="tagline">For Creators, By Creators</p>
        <div class="heading">
          <h1>Where Inspiration Finds a Home</h1>
          <h2>
            Save, organize, and rediscover your sparks of inspiration — all in
            one place.
          </h2>
        </div>
        <div class="cta-container">
          <BaseButton>Save Your First Gem</BaseButton
          ><BaseButton variant="secondary">Explore Features</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
</script>

<style scoped>
.home-view {
  padding: 0 var(--border-deco-width);
}

.hero {
  display: flex;
  height: 814px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--color-accent);

  .hero-container {
    display: flex;
    padding-top: 85px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: var(--radius-lg);
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 240, 224, 0) 20.67%,
      rgba(255, 240, 224, 0.8) 100%
    );
    .tagline {
      display: flex;
      padding: var(--spacing-xs) var(--spacing-sm);
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(35, 29, 23, 0.25);
      background: var(--color-light, #fffefd);
    }
  }
}
</style>
