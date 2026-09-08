<script setup lang="ts">
// Minimal "as-child" helper: renders the single default-slot child directly,
// merging this component's attrs (class, event listeners, aria-*, etc.) onto
// it instead of wrapping it in an extra element. Replaces reka-ui's built-in
// as-child support so Trigger/Item components can keep the same calling
// convention our app already uses (`<XTrigger as-child><button>...`).
import { Comment, cloneVNode, useAttrs, useSlots } from 'vue'

defineOptions({
    inheritAttrs: false,
})

const attrs = useAttrs()
const slots = useSlots()

function getChild() {
    const children = slots.default?.() ?? []
    const child = children.find(c => c.type !== Comment) ?? children[0]
    return child ? cloneVNode(child, attrs, true) : null
}
</script>

<template>
    <component :is="getChild()" v-if="getChild()" />
</template>
