<template>
  <div v-if="item">
    <h1>{{ item.title }}</h1>
    <img v-if="item.cover" :src="`${apiBase}/${item.cover}`" />
    <div v-for="(value, key) in item" :key="key">{{ key }}: {{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const apiBase = import.meta.env.VITE_API_BASE as string;
const route = useRoute();

const item = ref<Record<string, any> | null>(null);

onMounted(async () => {
  const res = await axios.get(`/api/CollectionItems/item/${route.params.id}`);
  item.value = res.data;
});
</script>
