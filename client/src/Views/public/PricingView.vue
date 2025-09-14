<template>
  <div id="pricing-view">
    <header>
      <h1>Built for Every <span>Creator</span></h1>
      <div class="switch">
        <button class="option active">Monthly</button>
        <button class="option">Annually</button>
      </div>
    </header>
    <section class="pricing">
      <div class="card">
        <div class="card-header">
          <h2>Starter</h2>
          <div class="divider">
            <img src="../../assets/divider.svg" alt="" />
          </div>
          <h3 class="price">€0 <span>/</span> forever</h3>
        </div>
        <ul>
          <li>Up to 3 vaults</li>
          <li>Each vault can hold 25 gems</li>
          <li>Basic organization & search</li>
        </ul>
        <div class="card-cta">
          <p>
            Perfect for exploring ideas and saving your first sparks of
            inspiration.
          </p>
          <BaseButton variant="secondary" full>Start for Free</BaseButton>
        </div>
      </div>
      <div class="card"></div>
      <div class="card"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
</script>

<style scoped>
#pricing-view {
  display: flex;
  flex-direction: column;
  gap: var(--border-width-deco);
}

header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
  background-color: var(--color-light);
  border-radius: var(--radius-md);

  .switch {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: calc(var(--radius-sm) + 0.25rem);
    background-color: var(--color-accent);

    .option {
      padding: var(--spacing-md) var(--spacing-lg);
      font-weight: var(--font-weight-semibold);
      background-color: transparent;
      transition: all var(--transition-base);
      border: var(--border-width-base) solid transparent;
      border-radius: var(--radius-sm);

      &.active {
        background-color: var(--color-primary);
      }

      &:hover {
        cursor: pointer;
        border: var(--border-width-base) solid var(--color-primary);
      }
    }
  }
}

.pricing {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: var(--border-width-deco);
  padding: var(--spacing-2xl) 0 var(--spacing-4xl) 0;

  .card {
    flex: 1 1 0;
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-xl);
    text-align: center;

    &:nth-child(1) {
      background-color: var(--color-light);
    }
    &:nth-child(2) {
      background-color: var(--color-primary);
    }
    &:nth-child(3) {
      background-color: var(--color-accent);
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;

      .divider {
        width: 100%;

        img {
          stroke: red;
        }
      }
    }
  }
}
</style>
