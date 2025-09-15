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
          <svg
            width="417"
            height="8"
            viewBox="0 0 417 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="divider"
          >
            <path
              d="M11.6779 6.16684C-1.32994 3.36434 -14.3752 0.771402 50.031 1.01603C115.467 1.26458 270.265 2.05273 415.667 2.05273"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <h3 class="price">€0 <span>/</span> forever</h3>
        </div>
        <ul>
          <li>Up to <span>3</span> vaults</li>
          <li>Each vault can hold <span>25</span> gems</li>
          <li><span>Basic</span> organization & search</li>
        </ul>
        <div class="card-cta">
          <p>
            Perfect for exploring ideas and saving your first sparks of
            inspiration.
          </p>
          <BaseButton variant="secondary" full>Start for Free</BaseButton>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Pro</h2>
          <svg
            width="417"
            height="8"
            viewBox="0 0 417 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="divider"
          >
            <path
              d="M11.6779 6.16684C-1.32994 3.36434 -14.3752 0.771402 50.031 1.01603C115.467 1.26458 270.265 2.05273 415.667 2.05273"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <h3 class="price">€15 <span>/</span> month</h3>
        </div>
        <ul>
          <li><span>Unlimited</span> vaults & gems</li>
          <li>Extra <span>personalization</span></li>
          <li><span>Priority</span> access to new features</li>
        </ul>
        <div class="card-cta">
          <p>
            Made for creators who want unlimited freedom and deeper
            personalization.
          </p>
          <BaseButton variant="secondary" full>Upgrade to Pro</BaseButton>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h2>Team</h2>
          <svg
            width="417"
            height="8"
            viewBox="0 0 417 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="divider"
          >
            <path
              d="M11.6779 6.16684C-1.32994 3.36434 -14.3752 0.771402 50.031 1.01603C115.467 1.26458 270.265 2.05273 415.667 2.05273"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <h3 class="price">€12 <span>/</span> month per user</h3>
        </div>
        <ul>
          <li>you're saving <span>€36</span> a year per member</li>
        </ul>
        <div class="card-cta">
          <p>
            Built for teams who create, share, and grow inspiration together.
          </p>
          <BaseButton variant="primary" full>Start with your team</BaseButton>
        </div>
      </div>
    </section>
    <section class="student-pricing">
      <p>
        Students get full access to Pro at a reduced price.<br />
        unlimited vaults, gems, and personalization, all with a valid student
        email.
      </p>
      <BaseButton>Apply with your student email</BaseButton>
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
    border-radius: calc(var(--radius-xs) + 0.25rem);
    background-color: var(--color-secondary);

    .option {
      padding: var(--spacing-sm) var(--spacing-md);
      font-weight: var(--font-weight-semibold);
      background-color: transparent;
      transition: all var(--transition-base);
      border: var(--border-width-base) solid transparent;
      border-radius: var(--radius-xs);

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

      .divider {
        stroke: var(--color-accent);
      }
    }
    &:nth-child(2) {
      background-color: var(--color-primary);

      .divider {
        stroke: var(--color-light);
      }
    }
    &:nth-child(3) {
      background-color: var(--color-secondary);

      .divider {
        stroke: var(--color-accent);
      }
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;

      h2 {
        font-size: var(--font-size-xl);
      }

      .divider {
        width: 100%;

        object-fit: fill;
      }

      span {
        font-weight: var(--font-weight-light);
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);

      span {
        font-weight: var(--font-weight-bold);
      }
    }
    .card-cta {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;
    }
  }
}

.student-pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-2xl) var(--spacing-xl);
  text-align: center;
  background-color: var(--color-light);
  border-radius: var(--radius-md);
}
</style>
