<template>
  <div>
    <router-view />
    <UnderDevelopmentPopup v-model="showWarning" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UnderDevelopmentPopup from "@/components/UnderDevelopmentPopup.vue";

defineOptions({ name: "App" });

const showWarning = ref(true);
</script>
