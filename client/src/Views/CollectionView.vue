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
          @click="removeCollection(collection, i)"
        >
        </BaseButton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import SideNav from "@/components/SideNav.vue";
import BaseButton from "../components/BaseButton.vue";

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
  components: { SideNav, BaseButton },
  setup() {
    const collections = ref<Collection[]>([]);
    const search = ref<string>("");

    const apiBase = API_BASE;

    const filteredCollections = computed(() =>
      collections.value.filter((c) =>
        c.title.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    const fetchCollections = async () => {
      try {
        const response = await axios.get<Collection[]>("/api/CollectionList/");
        collections.value = response.data;
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const removeCollection = async (collection: Collection, index: number) => {
      const confirmation = prompt(
        `To confirm deletion, type the name of the collection: "${collection.title}"`
      );

      if (confirmation !== collection.title) {
        alert("Collection name did not match. Deletion cancelled.");
        return;
      }

      try {
        await axios.delete(`/api/CollectionList/${collection._id}`);
        collections.value.splice(index, 1);
        alert(`Collection "${collection.title}" deleted.`);
      } catch (error) {
        console.error("Error deleting collection:", error);
        alert("Failed to delete collection. Please try again.");
      }
    };

    onMounted(fetchCollections);

    return {
      collections,
      search,
      apiBase,
      filteredCollections,
      removeCollection,
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
        border: 1px solid #ccc;
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
      background-color: #d9d9d9;

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
}
</style>
