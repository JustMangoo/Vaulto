<template>
  <div v-if="item" class="item-details-view">
    <h1>{{ item.title }}</h1>
    <img v-if="item.cover" :src="`${apiBase}/${item.cover}`" class="item-cover" />
    <div v-for="(value, key) in item" :key="key" class="item-field">
      {{ key }}: {{ value }}
    </div>
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

<style scoped>
.item-details-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;

  h1 {
    font-size: 2rem;
  }

  .item-cover {
    max-width: 400px;
    aspect-ratio: 4/3;
    object-fit: cover;
  }

  .item-field {
    background-color: #f0f0f0;
    padding: 8px;
    border-radius: 4px;
  }
}
</style>
