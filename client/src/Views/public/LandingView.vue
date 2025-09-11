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
        <div class="button-container">
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
          <svg
            class="roadline"
            viewBox="0 0 1438 82"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 61.6754C79.001 43.3301 173.253 -9.11637 321.402 3.11335C474.754 15.7726 445.817 80.162 587.461 79.0568C729.104 77.9517 715.569 8.85672 849.656 8.85672C992.008 8.85672 979.186 80.7151 1115.16 80.7151C1249.72 80.7151 1377.75 40.9108 1438 29.4173"
              fill="none"
              stroke="#A6A6A6"
              stroke-width="2"
              stroke-dasharray="29 29"
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
      </header>
    </section>
    <section class="cta-section">
      <div class="side-container"></div>
      <div class="cta-container">
        <div class="cta-background"></div>
        <div class="cta-button-container">
          <div class="cta-arrow left"><ArrowRight></ArrowRight></div>
          <div class="cta-button"><p>Get started for free</p></div>
          <div class="cta-arrow right"><ArrowRight></ArrowRight></div>
        </div>
        <div class="cta-background"></div>
      </div>
      <div class="side-container"></div>
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
.home-view {
  padding: 0 var(--border-deco-width);
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--border-deco-width);
}

h3 {
  color: var(--color-dark-1);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-light);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  opacity: 0.5;
  z-index: 0;
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
    .button-container {
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
  background: var(--color-light);
  border-radius: var(--radius-lg);

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
      height: 175px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      position: relative;

      .roadline {
        height: 175px;
        width: 100%;
        flex-shrink: 0;
        align-self: stretch;
      }

      .icon-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .roadmap-icon {
          position: absolute;
          top: 0;
          display: flex;
          width: 100px;
          height: 100px;
          padding: 16px;
          justify-content: center;
          align-items: center;
          border-radius: 16px;
          background: var(--color-primary);

          svg {
            width: 100%;
            height: auto;
            stroke-width: 0.1rem;
          }
        }

        .roadmap-icon:nth-child(1) {
          left: 5%;

          top: 36px;
        }

        .roadmap-icon:nth-child(2) {
          left: 33%;

          top: 68px;
        }

        .roadmap-icon:nth-child(3) {
          left: 60%;

          top: -30px;
        }

        .roadmap-icon:nth-child(4) {
          left: 85%;
          top: 106px;
        }
      }
    }
  }
}

.cta-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--border-deco-width);
  align-self: stretch;

  .side-container {
    flex: 1 1 0;
    align-self: stretch;
    border-radius: var(--radius-lg);
    background: var(--color-accent);
  }

  .cta-container {
    flex: 2 0 0;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    min-width: 610px;
    gap: var(--border-deco-width);

    .cta-button-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: stretch;
      flex: 0 0 auto;
      gap: var(--border-deco-width);
      min-width: max-content;
      white-space: nowrap;

      .cta-button {
        border-radius: var(--radius-lg);
        background: var(--color-primary);
        display: flex;
        width: 100%;
        padding: 24px 48px;
        justify-content: center;
        align-items: center;

        p {
          color: var(--color-dark-1);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
        }
      }

      .cta-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        background: var(--color-primary);
        border-radius: var(--radius-lg);
        transition: all var(--transition-base);
        overflow: hidden;

        &.left {
          width: 0;
          padding: 24px 0;
          margin-right: -1px;
        }

        &.right {
          width: auto;
          padding: 24px 48px;
          margin-left: 0;
        }

        svg {
          color: var(--color-dark-1);
          width: auto;
          height: 100%;
          stroke-width: 0.1rem;
        }
      }
    }

    .cta-button-container:hover {
      cursor: pointer;

      .cta-arrow.left {
        width: auto;
        padding: 24px 48px;
        margin-right: 0;
      }

      .cta-arrow.right {
        width: 0;
        padding: 24px 0;
        margin-left: -1px;
      }
    }

    .cta-background {
      align-self: stretch;
      border-radius: var(--radius-lg);
      background: var(--color-accent);
      flex: 1 1 212px;
      min-height: 80px;
    }
  }

  @media (max-width: 900px) {
    .side-container {
      display: none;
    }
  }
}
</style>
