<template>
  <div id="home-view">
    <section class="hero">
      <div class="hero-container">
        <p class="tagline">For Creators, By Creators</p>
        <header>
          <h1 class="display">Where Inspiration Finds a <span>Home</span></h1>
          <p>
            Save, organize, and rediscover your sparks of inspiration — all in
            one place.
          </p>
        </header>
        <div class="button-container">
          <BaseButton>Save Your First Gem</BaseButton
          ><BaseButton variant="secondary">Explore Features</BaseButton>
        </div>
      </div>
    </section>
    <section class="features">
      <!-- MASTER CLASS THING -->
      <header>
        <h2>What Vaulto Can Do</h2>
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
        <h2>The Road Ahead</h2>
        <p>
          Vaulto is just getting started.<br />From collaboration tools to
          smarter inspiration discovery,<br />we’re building a future where your
          creativity can grow without limits.
        </p>
      </header>
      <div class="roadmap-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1442"
          height="97"
          viewBox="0 0 1442 97"
          fill="none"
          class="roadline"
        >
          <path
            d="M0.999996 48.1584C0.999996 48.1584 105.528 8.4952 181 2.0823C332.101 -10.7568 388.449 94.8745 541 94.8745C693.551 94.8745 748.449 2.08234 901 2.08234C1053.55 2.08234 1109.96 107.994 1261 94.8745C1336.6 88.3078 1441 48.1585 1441 48.1585"
            stroke="#A6A6A6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="23 23"
            fill="none"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <div class="icon-container">
          <div class="roadmap-icon"><Users /></div>
          <div class="roadmap-icon"><Blocks /></div>
          <div class="roadmap-icon">
            <TabletSmartphone />
          </div>
          <div class="roadmap-icon"><Sparkles /></div>
        </div>
      </div>
    </section>
    <section class="cta-section">
      <div class="cta-block cta-block--left"></div>

      <div class="cta-block cta-block--top"></div>
      <div class="cta-button-container">
        <div class="cta-arrow left"><ArrowRight></ArrowRight></div>
        <div class="cta-button">
          <p>Get started for <span>free</span></p>
        </div>
        <div class="cta-arrow right"><ArrowRight></ArrowRight></div>
      </div>
      <div class="cta-block cta-block--bottom"></div>

      <div class="cta-block cta-block--right"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import {
  ArrowRight,
  Users,
  Blocks,
  TabletSmartphone,
  Sparkles,
} from "lucide-vue-next";
</script>

<style scoped>
#home-view {
  padding: 0 var(--border-width-deco);
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--border-width-deco);
}

p {
  text-align: center;
}

.hero {
  display: flex;
  height: 50vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: var(--radius-md);
  background: var(--color-secondary);

  .hero-container {
    display: flex;
    padding-top: var(--spacing-md);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xl);
    align-self: stretch;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 240, 224, 0) 20.67%,
      rgba(255, 240, 224, 0.8) 100%
    );
    .tagline {
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-md);
      border: 1px solid rgba(35, 29, 23, 0.25);
      background: var(--color-light);
      font-size: var(--font-size-sm);
    }
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .button-container {
      display: flex;
      gap: var(--spacing-md);
    }
  }
}

.features {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--border-width-deco);
  align-self: stretch;

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-3xl) 0 var(--spacing-2xl) 0;
    gap: var(--spacing-md);
    align-self: stretch;
    border-radius: var(--radius-md);
    background: var(--color-light);
  }

  .feature-grid {
    display: grid;
    height: 50vw;
    row-gap: var(--border-width-deco);
    column-gap: var(--border-width-deco);
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
      background: var(--color-secondary);
      border-radius: var(--radius-md);
    }
  }
}

.roadmap {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  background: var(--color-light);
  border-radius: var(--radius-md);
  padding-bottom: var(--spacing-3xl);

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: var(--spacing-md);
    padding: var(--spacing-3xl) 0 var(--spacing-2xl) 0;
    border-radius: var(--radius-md);
  }

  .roadmap-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    position: relative;
    height: 15vw;

    .roadline {
      width: 100%;
      flex-shrink: 0;
      align-self: stretch;
      height: 15vw;
    }

    .icon-container {
      inset: 0;
      display: flex;
      align-items: center;
      position: absolute;

      .roadmap-icon {
        top: 0;
        display: flex;
        margin: 0 auto;
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        background: var(--color-primary);

        svg {
          width: var(--font-size-2xl);
          height: auto;
          stroke-width: 1px;
        }
      }

      .roadmap-icon:nth-child(even) {
        margin-top: 6.5vw;
      }
      .roadmap-icon:nth-child(odd) {
        margin-top: -6.5vw;
      }
    }
  }
}

.cta-section {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr 1fr 2fr;
  grid-column-gap: var(--border-width-deco);
  grid-row-gap: var(--border-width-deco);
  align-self: stretch;

  .cta-block--left {
    grid-area: 1 / 1 / 4 / 2;
  }
  .cta-block--top {
    grid-area: 1 / 2 / 2 / 3;
  }
  .cta-button-container {
    grid-area: 2 / 2 / 3 / 3;
  }
  .cta-block--bottom {
    grid-area: 3 / 2 / 4 / 3;
  }
  .cta-block--right {
    grid-area: 1 / 3 / 4 / 4;
  }

  .cta-block {
    align-self: stretch;
    border-radius: var(--radius-md);
    background: var(--color-secondary);
  }

  .cta-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    gap: var(--border-width-deco);
    min-width: max-content;
    white-space: nowrap;

    .cta-button {
      border-radius: var(--radius-md);
      background: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: var(--spacing-lg) var(--spacing-xl);

      p {
        font-family: var(--font-family-display);
        color: var(--color-dark-1);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        text-align: center;
        white-space: nowrap;

        span {
          font-family: var(--font-family-accent);
          font-weight: var(--font-weight-normal);
        }
      }
    }

    .cta-arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      background: var(--color-primary);
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      overflow: hidden;

      &.left {
        width: 0;
        padding: var(--spacing-lg) 0;
        margin-right: -1px;
      }

      &.right {
        width: auto;
        padding: var(--spacing-lg) var(--spacing-xl);
        margin-left: 0;
      }

      svg {
        color: var(--color-dark-1);
        width: auto;
        height: 100%;
        stroke-width: 2px;
      }
    }
  }

  .cta-button-container:hover {
    cursor: pointer;

    .cta-arrow.left {
      width: auto;
      padding: var(--spacing-lg) var(--spacing-xl);
      margin-right: 0;
    }

    .cta-arrow.right {
      width: 0;
      padding: var(--spacing-lg) 0;
      margin-left: -1px;
    }
  }

  @media (max-width: 900px) {
    .cta-side {
      display: none;
    }
  }
}
</style>
