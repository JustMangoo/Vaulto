<template>
  <div class="texture-box">
    <svg width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <filter id="pencilTexture3">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 -1.5 1.5" result="f2" />
          <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3" />
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise" />
          <feDisplacementMap in="f3" in2="noise" xChannelSelector="R" yChannelSelector="G" scale="2.5" result="f4" />
        </filter>
      </defs>
      <rect x="20" y="20" width="160" height="160"
            fill="none" stroke="black" stroke-width="2"
            filter="url(#pencilTexture3)" />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.texture-box {
  padding: 16px;
}
</style>
