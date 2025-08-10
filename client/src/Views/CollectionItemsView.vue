<template>
  <div class="collection-items-view">
    <h1>{{ collection?.title }}</h1>
    <p>{{ collection?.description }}</p>

    <!-- Add New Item Form -->
    <form @submit.prevent="addItem">
      <div v-for="field in collection?.fields" :key="field.name">
        <label>{{ field.name }}</label>
        <input v-if="field.type === 'text'" v-model="newItem[field.name]" />
        <input
          v-else-if="field.type === 'link'"
          v-model="newItem[field.name]"
          type="url"
        />
        <!-- Add more input types as needed -->
      </div>
      <label>Cover Image</label>
      <input type="file" @change="onCoverUpload" />
      <BaseButton iconName="Plus" showIcon showText>Add Item</BaseButton>
    </form>

    <!-- Items List -->
    <div class="items-grid">
      <div
        class="item-card"
        v-for="item in items"
        :key="item._id"
        @click="$router.push({ name: 'ItemDetails', params: { id: item._id } })"
      >
        <img
          v-if="item.cover"
          :src="`${apiBase}/${item.cover}`"
          class="item-cover"
        />
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";

const apiBase = import.meta.env.VITE_API_BASE as string;
const route = useRoute();

interface Field {
  name: string;
  type: string;
}

interface Collection {
  _id: string;
  title: string;
  description: string;
  fields: Field[];
}

interface Item {
  _id: string;
  title: string;
  cover?: string;
  [key: string]: any;
}

const collection = ref<Collection | null>(null);
const items = ref<Item[]>([]);
const newItem = ref<Record<string, any>>({});
const coverFile = ref<File | null>(null);

const fetchCollection = async () => {
  const res = await axios.get<Collection>(
    `/api/CollectionList/${route.params.id}`
  );
  collection.value = res.data;
};

const fetchItems = async () => {
  const res = await axios.get<Item[]>(
    `/api/CollectionItems/${route.params.id}`
  );
  items.value = res.data;
};

const onCoverUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    coverFile.value = target.files[0];
  }
};

const addItem = async () => {
  const formData = new FormData();
  for (const key in newItem.value) {
    formData.append(key, newItem.value[key]);
  }
  if (coverFile.value) formData.append("cover", coverFile.value);

  await axios.post(`/api/CollectionItems/${route.params.id}`, formData);
  await fetchItems();
  newItem.value = {};
  coverFile.value = null;
};

onMounted(async () => {
  await fetchCollection();
  await fetchItems();
});
</script>
