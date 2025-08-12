<template>
  <div class="collection-items-view">
    <header>
      <h1>{{ collection?.title }}</h1>
      <Input v-model="search" type="text" placeholder="Search" />
    </header>
    <p class="description">{{ collection?.description }}</p>

    <div class="action-bar">
      <div class="action-group">
        <select>
          <option value="none">Sort by</option>
        </select>
      </div>
      <div class="action-group">
        <BaseButton
          iconName="Plus"
          showIcon
          showText
          @click="showAddPopup = true"
        >
          Add Item
        </BaseButton>
      </div>
    </div>

    <Popup
      v-model="showAddPopup"
      title="Add New Item"
      primaryText="Add"
      secondaryText="Cancel"
      @primary="handleAddItem"
    >
      <div v-for="field in collection?.fields" :key="field.name">
        <label>{{ formatLabel(field.name) }}</label>
        <Input
          v-if="field.type === 'short-text'"
          v-model="newItem[field.name]"
        />
        <textarea
          v-else-if="field.type === 'long-text'"
          v-model="newItem[field.name]"
        />
        <Input
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
    </Popup>

    <!-- Items List -->
    <div class="items-grid">
      <div
        class="item-card"
        v-for="item in filteredItems"
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import Popup from "@/components/Popup.vue";
import Input from "@/components/Input.vue";

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
const search = ref<string>("");
const filteredItems = computed(() =>
  items.value.filter((i) =>
    i.title.toLowerCase().includes(search.value.toLowerCase())
  )
);
const newItem = ref<Record<string, any>>({});
const fileFields = ref<Record<string, File | null>>({});
const showAddPopup = ref(false);

const fetchCollection = async () => {
  try {
    const res = await axios.get<Collection>(
      `/api/CollectionList/${route.params.id}`
    );
    collection.value = res.data;
  } catch (err) {
    console.error("Error fetching collection:", err);
    alert("Failed to load collection.");
  }
};

const fetchItems = async () => {
  try {
    const res = await axios.get<Item[]>(
      `/api/CollectionItems/${route.params.id}`
    );
    items.value = res.data;
  } catch (err) {
    console.error("Error fetching items:", err);
    alert("Failed to load items.");
  }
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

const handleAddItem = async () => {
  await addItem();
  showAddPopup.value = false;
};

onMounted(async () => {
  try {
    await fetchCollection();
    await fetchItems();
  } catch (err) {
    console.error("Initialization error:", err);
  }
});
</script>

<style scoped>
.collection-items-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 2rem;
      color: white;
    }
  }

  .description {
    margin-top: -16px;
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    .action-group {
      display: flex;
      gap: 8px;

      select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--color-border);
        background: var(--color-bg);
        color: var(--color-text);
      }
    }
  }

  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;

    .item-card {
      position: relative;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: var(--color-surface-alt);
      color: var(--color-text);

      .item-cover {
        aspect-ratio: 4/3;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
