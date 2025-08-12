<template>
  <div class="texture-box">
    <svg width="100%" height="100%">
      <defs>
        <filter id="pencilTexture3">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="5"
            stitchTiles="stitch"
            result="f1"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 0 0
                             0 0 0 -1.5 1.5"
            result="f2"
          />
          <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="f3"
            in2="noise"
            xChannelSelector="R"
            yChannelSelector="G"
            scale="2.5"
            result="f4"
          />
        </filter>
      </defs>
      <rect
        x="4"
        y="4"
        width="96%"
        height="96%"
        fill="none"
        stroke="white"
        stroke-width="4"
        filter="url(#pencilTexture3)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.texture-box {
  padding: 16px;
}
</style>
