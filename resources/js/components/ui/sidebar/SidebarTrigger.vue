<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PanelLeftClose, PanelLeftOpen } from "@lucide/vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isMobile, state, toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    class="sidebar-trigger"
    :class="cn(props.class)"
    @click="toggleSidebar"
  >
    <PanelLeftOpen v-if="isMobile || state === 'collapsed'" />
    <PanelLeftClose v-else />
    <span class="sr-only">Toggle sidebar</span>
  </Button>
</template>

<style lang="scss" scoped>
.sidebar-trigger {
    height: 1.75rem;
    width: 1.75rem;
}
</style>
