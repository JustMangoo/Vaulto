<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-container">
        <p class="tagline">For Creators, By Creators</p>
        <header>
          <h1>Where Inspiration Finds a Home</h1>
          <h2>
            Save, organize, and rediscover your sparks of inspiration — all in
            one place.
          </h2>
        </header>
        <div class="cta-container">
          <BaseButton>Save Your First Gem</BaseButton
          ><BaseButton variant="secondary">Explore Features</BaseButton>
        </div>
      </div>
    </section>
    <section class="features">
      <header>
        <h3>What Vaulto Can Do</h3>
        <p>
          Flexible vaults, customizable fields, and a space built for
          creators.<br />
          Vaulto makes it easy to capture, organize, and revisit your
          inspiration — your way.
        </p>
      </header>
      <div class="feature-grid">
        <div id="feature-store" class="grid-block"></div>
        <div id="feature-search" class="grid-block"></div>
        <div id="feature-private" class="grid-block"></div>
        <div id="feature-personalize" class="grid-block"></div>
      </div>
    </section>
    <section class="roadmap">
      <header>
        <h3>The Road Ahead</h3>
        <p>
          Vaulto is just getting started.<br />From collaboration tools to
          smarter inspiration discovery,<br />we’re building a future where your
          creativity can grow without limits.
        </p>
        <div class="roadmap-container">
          <img src="../../assets/roadmap.svg" alt="" />
          <div class="icon-container">
            <div class="icon-wrapper"></div>
            <div class="icon-wrapper"></div>
            <div class="icon-wrapper"></div>
            <div class="icon-wrapper"></div>
          </div>
        </div>
      </header>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
</script>

<style scoped>
.home-view {
  padding: 0 var(--border-deco-width);
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--border-deco-width);
}

h3 {
  color: var(--color-dark-1, #231d17);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-light);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  opacity: 0.5;
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
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: stretch;

      h1 {
        color: var(--color-dark-1);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        line-height: 1.2;
        text-align: center;
      }

      h2 {
        color: var(--color-dark-2);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-normal);
        text-align: center;
        line-height: 1.5;
      }
    }
    .cta-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-md);
      align-self: stretch;
    }
  }
}

.features {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--border-deco-width);
  align-self: stretch;

  header {
    display: flex;
    padding: 128px 0 64px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    align-self: stretch;
    border-radius: var(--radius-lg);
    background: var(--color-light, #fffefd);

    p {
      color: var(--color-dark-1);
      text-align: center;
      font-size: var(--font-size-md);
      max-width: 550px;
      font-weight: var(--font-weight-normal);
    }
  }

  .feature-grid {
    display: grid;
    height: 833px;
    row-gap: 1px;
    column-gap: 1px;
    align-self: stretch;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-template-columns: repeat(4, minmax(0, 1fr));

    #feature-store {
      grid-area: 1 / 1 / 4 / 3;
    }
    #feature-search {
      grid-area: 1 / 3 / 3 / 5;
    }
    #feature-private {
      grid-area: 4 / 1 / 6 / 3;
    }
    #feature-personalize {
      grid-area: 3 / 3 / 6 / 5;
    }

    .grid-block {
      background: var(--color-accent);
      border-radius: var(--radius-lg);
    }
  }
}

.roadmap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--border-deco-width);
  align-self: stretch;
  background: var(--color-light, #fffefd);

  header {
    display: flex;
    padding: 128px 0 64px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    align-self: stretch;
    border-radius: var(--radius-lg);

    p {
      color: var(--color-dark-1);
      text-align: center;
      font-size: var(--font-size-md);
      max-width: 550px;
      font-weight: var(--font-weight-normal);
    }

    .roadmap-container {
      display: flex;
      padding: 128px 0;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      align-self: stretch;

      img {
        width: 100%;
        height: auto;
        max-width: 800px;
        border-radius: var(--radius-lg);
      }

      .icon-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 40px;

        .icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-accent);
        }
      }
    }
  }
}
</style>
