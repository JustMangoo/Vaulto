<template>
  <div class="collection-view">
    <header>
      <h1>Collections</h1>
      <Input v-model="search" type="text" placeholder="Search" />
    </header>
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
        <div class="action-menu">
          <BaseButton
            iconName="EllipsisVertical"
            showIcon
            @click.stop="toggleActionMenu(i)"
          />
          <ActionMenu
            v-if="activeMenuIndex === i"
            position="top"
            align="right"
            @click.stop
          >
            <button @click="copyLink(collection._id)">Copy Link</button>
            <button @click="editCollection(collection._id)">Edit</button>
            <button @click="openDeletePopup(collection, i); activeMenuIndex = null">
              Delete
            </button>
          </ActionMenu>
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
        Type "{{ collectionToDelete.title }}" to confirm deletion
      </p>
      <Input v-model="confirmationName" />
      <p v-if="deleteError" class="error">{{ deleteError }}</p>
    </Popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import BaseButton from "../components/BaseButton.vue";
import BaseSelect from "../components/BaseSelect.vue";
import Popup from "@/components/Popup.vue";
import Input from "@/components/Input.vue";
import ActionMenu from "@/components/ActionMenu.vue";

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

export default defineComponent({
  name: "CollectionView",
  components: { BaseSelect, BaseButton, Popup, Input, ActionMenu },
  setup() {
    const collections = ref<Collection[]>([]);
    const search = ref<string>("");
    const sortBy = ref<string>("");
    const typeFilter = ref<string>("");

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
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (sortBy.value === "desc") {
        result = [...result].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }

      return result;
    });

    const showDeletePopup = ref(false);
    const collectionToDelete = ref<Collection | null>(null);
    const deleteIndex = ref<number | null>(null);
    const confirmationName = ref("");
    const deleteError = ref("");

    const router = useRouter();

    const activeMenuIndex = ref<number | null>(null);

    const toggleActionMenu = (index: number) => {
      activeMenuIndex.value =
        activeMenuIndex.value === index ? null : index;
    };

    const copyLink = (id: string) => {
      const url = `${window.location.origin}/collections/${id}`;
      navigator.clipboard.writeText(url);
      activeMenuIndex.value = null;
    };

    const editCollection = (id: string) => {
      router.push({ name: "EditCollection", params: { id } });
      activeMenuIndex.value = null;
    };

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
      sortBy,
      typeFilter,
      sortOptions,
      typeOptions,
      apiBase,
      filteredCollections,
      showDeletePopup,
      collectionToDelete,
      confirmationName,
      deleteError,
      activeMenuIndex,
      toggleActionMenu,
      copyLink,
      editCollection,
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
