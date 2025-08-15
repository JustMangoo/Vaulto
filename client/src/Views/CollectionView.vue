<template>
  <div class="collection-view">
    <header>
      <h1>Collections</h1>
      <Input v-model="search" type="text" placeholder="Search" />
    </header>
    <DecorationLine
      orientation="horizontal"
      :fadeStart="false"
      :fadeEnd="true"
      thickness="2px"
      length="100%"
      class="divider-line"
    />
    <div class="action-bar">
      <div class="action-group">
        <BaseSelect
          v-model="sortBy"
          :options="sortOptions"
          placeholder="Sort by"
        />
        <BaseSelect
          v-model="typeFilter"
          :options="typeOptions"
          placeholder="Type"
        />
      </div>
      <div class="action-group">
        <router-link :to="{ name: 'NewCollections' }">
          <BaseButton showText> Create </BaseButton>
        </router-link>
      </div>
    </div>
    <div class="collection-grid">
      <router-link
        :to="{ name: 'CollectionItems', params: { id: collection._id } }"
        class="card"
        v-for="(collection, i) in filteredCollections"
        :key="collection._id"
      >
        <BaseButton class="pin" showText><Pin class="pin-icon" /></BaseButton>
        <img
          v-if="collection.cover"
          :src="`${apiBase}/${collection.cover.replace(/\\/g, '/')}`"
          alt="Cover"
          class="cover-image"
        />
        <div v-else class="cover-image">No cover available</div>
        <div class="collection-name">{{ collection.title }}</div>
        <div class="action-menu" @click.stop>
          <BaseButton
            iconName="EllipsisVertical"
            showIcon
            @click.prevent="toggleMenu(i)"
          />
          <DropdownMenu
            v-if="openMenuIndex === i"
            position="top"
            align="left"
            class="collection-actions"
          >
            <button @click.stop="copyLink(collection)">Copy link</button>
            <button @click.stop="editCollection(collection)">Edit</button>
            <button @click.stop="openDelete(collection, i)">Delete</button>
          </DropdownMenu>
        </div>
      </router-link>
    </div>
    <Popup
      v-model="showDeletePopup"
      title="Delete Collection"
      primaryText="Delete"
      secondaryText="Cancel"
      @primary="confirmDelete"
      @secondary="cancelDelete"
    >
      <p v-if="collectionToDelete">
        Type "{{ collectionToDelete.title }}" to bid farewell
      </p>
      <Input v-model="confirmationName" />
      <p v-if="deleteError" class="error">{{ deleteError }}</p>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Pin } from "lucide-vue-next";
import axios from "axios";
import BaseButton from "../components/BaseButton.vue";
import BaseSelect from "../components/BaseSelect.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import Popup from "@/components/Popup.vue";
import Input from "@/components/Input.vue";
import DecorationLine from "../components/DecorationLine.vue";

const API_BASE = import.meta.env.VITE_API_BASE as string;

interface CollectionField {
  name: string;
  type: string;
}

interface Collection {
  _id: string;
  title: string;
  type: string;
  description: string;
  cover?: string;
  fields: CollectionField[];
}

interface SelectOption {
  label: string;
  value: string | number;
}

defineOptions({ name: "CollectionView" });

const collections = ref<Collection[]>([]);
const search = ref<string>("");
const sortBy = ref<string>("");
const typeFilter = ref<string>("");
const openMenuIndex = ref<number | null>(null);

const router = useRouter();

const apiBase = API_BASE;

const sortOptions: SelectOption[] = [
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

const typeOptions = computed<SelectOption[]>(() => {
  const types = Array.from(new Set(collections.value.map((c) => c.type)));
  return [
    { label: "All", value: "" },
    ...types.map((t) => ({ label: t, value: t })),
  ];
});

const filteredCollections = computed(() => {
  let result = collections.value.filter((c) =>
    c.title.toLowerCase().includes(search.value.toLowerCase())
  );

  if (typeFilter.value) {
    result = result.filter((c) => c.type === typeFilter.value);
  }

  if (sortBy.value === "asc") {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === "desc") {
    result = [...result].sort((a, b) => b.title.localeCompare(a.title));
  }

  return result;
});

const showDeletePopup = ref(false);
const collectionToDelete = ref<Collection | null>(null);
const deleteIndex = ref<number | null>(null);
const confirmationName = ref("");
const deleteError = ref("");

const fetchCollections = async () => {
  try {
    const response = await axios.get<Collection[]>("/api/CollectionList/");
    collections.value = response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

const toggleMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const copyLink = async (collection: Collection) => {
  const url = `${window.location.origin}/collections/${collection._id}`;
  await navigator.clipboard.writeText(url);
  openMenuIndex.value = null;
};

const editCollection = (collection: Collection) => {
  router.push({ name: "NewCollections", query: { edit: collection._id } });
  openMenuIndex.value = null;
};

const openDelete = (collection: Collection, index: number) => {
  openMenuIndex.value = null;
  openDeletePopup(collection, index);
};

const openDeletePopup = (collection: Collection, index: number) => {
  collectionToDelete.value = collection;
  deleteIndex.value = index;
  confirmationName.value = "";
  deleteError.value = "";
  showDeletePopup.value = true;
};

const confirmDelete = async () => {
  if (!collectionToDelete.value) return;
  if (confirmationName.value !== collectionToDelete.value.title) {
    deleteError.value = "Collection name did not match.";
    return;
  }
  try {
    await axios.delete(`/api/CollectionList/${collectionToDelete.value._id}`);
    if (deleteIndex.value !== null) {
      collections.value.splice(deleteIndex.value, 1);
    }
    showDeletePopup.value = false;
  } catch (error) {
    console.error("Error deleting collection:", error);
    deleteError.value = "Failed to delete collection. Please try again.";
  }
};

const cancelDelete = () => {
  showDeletePopup.value = false;
};

onMounted(fetchCollections);
</script>

<style scoped>
/* ---- Collection Wrapper ---- */
.collection-view {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  padding-left: 0;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1em;

    h1 {
      font-size: 2rem;
      color: var(--color-text);
    }
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-left: 1em;

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

      .create-btn {
        text-decoration: none;
      }
    }
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-left: 1em;

    .card {
      position: relative;
      padding: 0.5em;
      gap: 0.5em;
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface);
      color: var(--color-text);
      border-radius: 8px;

      .pin {
        position: absolute;
        top: 16px;
        right: 16px;

        .pin-icon {
          width: 18px;
          height: 18px;
          margin-bottom: -2px;
          rotate: 45deg;
        }
      }

      .action-menu {
        position: absolute;
        bottom: 8px;
        right: 8px;
        border-radius: 4px;

        a,
        button {
          text-align: left;
          padding: 4px 8px;
          text-decoration: none;
          color: var(--color-text);
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }

        a:hover,
        button:hover {
          background-color: var(--color-surface-alt);
        }
      }

      .collection-name {
        font-weight: bold;
        font-size: 0.875em;
        color: var(--color-text);
        padding: 0.75em;
      }

      .cover-image {
        aspect-ratio: 4/3;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
  }

  .error {
    color: red;
    margin-top: 8px;
  }
}
</style>
