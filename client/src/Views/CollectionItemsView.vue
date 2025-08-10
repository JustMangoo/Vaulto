<template>
  <div class="collection-items-view">
    <h1>{{ collection?.title }}</h1>
    <p>{{ collection?.description }}</p>

    <!-- Add New Item Form -->
    <form @submit.prevent="addItem">
      <div v-for="field in collection?.fields" :key="field.name">
        <label>{{ formatLabel(field.name) }}</label>
        <input
          v-if="field.type === 'short-text'"
          v-model="newItem[field.name]"
          type="text"
        />
        <textarea
          v-else-if="field.type === 'long-text'"
          v-model="newItem[field.name]"
        />
        <input
          v-else-if="field.type === 'link'"
          v-model="newItem[field.name]"
          type="url"
        />
        <textarea
          v-else-if="field.type === 'code'"
          v-model="newItem[field.name]"
        />
        <input
          v-else-if="field.type === 'image'"
          type="file"
          @change="(e) => onFileUpload(field.name, e)"
        />
      </div>
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
const fileFields = ref<Record<string, File | null>>({});

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

const onFileUpload = (name: string, e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    fileFields.value[name] = target.files[0];
  }
};

const formatLabel = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const addItem = async () => {
  const formData = new FormData();
  for (const key in newItem.value) {
    formData.append(key, newItem.value[key]);
  }
  for (const key in fileFields.value) {
    const file = fileFields.value[key];
    if (file) formData.append(key, file);
  }

  await axios.post(`/api/CollectionItems/${route.params.id}`, formData);
  await fetchItems();
  newItem.value = {};
  fileFields.value = {};
};

onMounted(async () => {
  await fetchCollection();
  await fetchItems();
});
</script>
