<script setup lang="ts">
import type { SidebarProps } from "."
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from '@/components/ui/sheet'
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue'
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue'
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    class="sidebar-fixed"
    :class="cn(props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      class="sidebar-mobile-panel"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div class="sidebar-mobile-content">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="sidebar-desktop"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div class="sidebar-desktop__gap" />
    <div
      class="sidebar-desktop__frame"
      :class="cn(props.class)"
      v-bind="$attrs"
    >
      <div data-sidebar="sidebar" class="sidebar-desktop__panel">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-fixed {
    display: flex;
    height: 100%;
    width: var(--sidebar-width);
    flex-direction: column;
    background: var(--sidebar);
    color: var(--sidebar-foreground);
}

.sidebar-mobile-panel {
    background: var(--sidebar);
    color: var(--sidebar-foreground);
    padding: 0;
}

.sidebar-mobile-content {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}

.sidebar-desktop {
    position: relative;
    display: none;
    color: var(--sidebar-foreground);


    @media (min-width: 768px) {
        display: block;
    }

    &__gap {
        position: relative;
        width: var(--sidebar-width);
        background: transparent;
        transition: width 200ms linear;
    }

    &[data-collapsible='offcanvas'] &__gap {
        width: 0;
    }

    &[data-collapsible='icon'] &__gap {
        width: var(--sidebar-width-icon);
    }

    &__frame {
        position: fixed;
        inset: 0 auto 0 0;
        z-index: 10;
        display: none;
        height: 100svh;
        width: var(--sidebar-width);

        transition:
            left 200ms linear,
            right 200ms linear,
            width 200ms linear;

        @media (min-width: 768px) {
            display: flex;
        }
    }

    &[data-side='right'] &__frame {
        left: auto;
        right: 0;
    }

    &[data-collapsible='offcanvas'] &__frame {
        left: calc(var(--sidebar-width) * -1);
    }

    &[data-side='right'][data-collapsible='offcanvas'] &__frame {
        left: auto;
        right: calc(var(--sidebar-width) * -1);
    }

    &[data-collapsible='icon'] &__frame {
        width: var(--sidebar-width-icon);
    }

    &[data-variant='floating'] &__frame,
    &[data-variant='inset'] &__frame {
        padding: 0.5rem;
    }

    &:not([data-variant='floating']):not([data-variant='inset'])[data-side='left'] &__frame {
        border-right: 1px solid var(--sidebar-border);
    }

    &:not([data-variant='floating']):not([data-variant='inset'])[data-side='right'] &__frame {
        border-left: 1px solid var(--sidebar-border);
    }

    &__panel {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        background: var(--sidebar);
        border: 1px solid var(--sidebar-border);
    }

    &[data-variant='floating'] &__panel {
        border: 1px solid var(--sidebar-border);
        border-radius: var(--radius-lg);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    }
}
</style>
