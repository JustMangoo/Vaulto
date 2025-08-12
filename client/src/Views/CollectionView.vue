<template>
  <div class="collection-view">
    <header>
      <h1>Collections</h1>
      <input v-model="search" type="text" placeholder="Search" />
    </header>
    <div class="action-bar">
      <div class="action-group">
        <select>
          <option value="none">Sort by</option>
        </select>
        <select>
          <option value="none">Type</option>
        </select>
      </div>
      <div class="action-group">
        <router-link :to="{ name: 'NewCollections' }">
          <BaseButton iconName="Plus" showIcon showText> Create </BaseButton>
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
        <div class="pin">📌</div>
        <img
          v-if="collection.cover"
          :src="`${apiBase}/${collection.cover.replace(/\\/g, '/')}`"
          alt="Cover"
          class="cover-image"
        />
        <div v-else class="cover-image">No cover available</div>
        <div class="collection-name">{{ collection.title }}</div>
        <BaseButton
          iconName="EllipsisVertical"
          showIcon
          class="action-menu"
          @click.stop.prevent="openDeletePopup(collection, i)"
        >
        </BaseButton>
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
        Type "{{ collectionToDelete.title }}" to confirm deletion
      </p>
      <Input v-model="confirmationName" />
      <p v-if="deleteError" class="error">{{ deleteError }}</p>
    </Popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import SideNav from "@/components/SideNav.vue";
import BaseButton from "../components/BaseButton.vue";
import Popup from "@/components/Popup.vue";
import Input from "@/components/Input.vue";

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

export default defineComponent({
  name: "CollectionView",
  components: { SideNav, BaseButton, Popup, Input },
  setup() {
    const collections = ref<Collection[]>([]);
    const search = ref<string>("");

    const apiBase = API_BASE;

    const filteredCollections = computed(() =>
      collections.value.filter((c) =>
        c.title.toLowerCase().includes(search.value.toLowerCase())
      )
    );

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
        await axios.delete(
          `/api/CollectionList/${collectionToDelete.value._id}`
        );
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

    return {
      collections,
      search,
      apiBase,
      filteredCollections,
      showDeletePopup,
      collectionToDelete,
      confirmationName,
      deleteError,
      openDeletePopup,
      confirmDelete,
      cancelDelete,
    };
  },
});
</script>

<style scoped>
/* ---- Collection Wrapper ---- */
.collection-view {
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
      color: var(--color-text);
    }
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

      .create-btn {
        text-decoration: none;
      }
    }
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;

    .card {
      position: relative;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: var(--color-surface-alt);
      color: var(--color-text);

      .pin {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .action-menu {
        position: absolute;
        bottom: 8px;
        right: 8px;
      }

      .cover-image {
        aspect-ratio: 4/3;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .error {
    color: red;
    margin-top: 8px;
  }
}
</style>
