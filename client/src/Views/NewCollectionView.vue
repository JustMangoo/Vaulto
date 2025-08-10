<template>
  <div class="new-collection-view">
    <div v-if="stage === 1">
      <!-- Stage 1 UI -->
      <h2>Create Collection</h2>
      <input type="file" @change="onCoverUpload" />
      <input v-model="title" placeholder="Title" />
      <input v-model="type" placeholder="Type (custom or select)" />
      <textarea v-model="description" placeholder="Description"></textarea>
      <button @click="nextStage">Continue</button>
    </div>

    <div v-else-if="stage === 2">
      <!-- Stage 2 UI -->
      <h2>Choose Fields</h2>
      <div v-for="(field, index) in fields" :key="index">
        <input
          v-model="field.name"
          placeholder="Field name"
          :disabled="field.isDefault"
        />
        <select v-model="field.type" :disabled="field.isDefault">
          <option value="short-text">Short Text</option>
          <option value="long-text">Long Text</option>
          <option value="link">Link</option>
          <option value="code">Code</option>
        </select>
        <button v-if="!field.isDefault" @click="removeField(index)">
          Remove
        </button>
      </div>
      <button @click="addField">+ Add Field</button>

      <button @click="submitCollection">Complete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SideNav from "../components/SideNav.vue";

interface CollectionField {
  name: string;
  type: string;
  isDefault?: boolean;
}

export default defineComponent({
  name: "NewCollectionView",
  components: { SideNav },
  setup() {
    const router = useRouter();

    const stage = ref<number>(1);
    const title = ref<string>("");
    const type = ref<string>("");
    const description = ref<string>("");
    const cover = ref<File | null>(null);
    const fields = ref<CollectionField[]>([
      { name: "title", type: "short-text", isDefault: true },
      { name: "cover", type: "image", isDefault: true },
    ]);

    const nextStage = () => {
      if (!title.value || !type.value || !description.value) {
        alert("Please fill all fields");
        return;
      }
      stage.value = 2;
    };

    const addField = () => {
      fields.value.push({ name: "", type: "short-text" });
    };

    const removeField = (index: number) => {
      fields.value.splice(index, 1);
    };

    const onCoverUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        cover.value = target.files[0];
      }
    };

    const submitCollection = async () => {
      if (!cover.value) {
        alert("Please upload a cover image.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("type", type.value);
      formData.append("description", description.value);
      formData.append("cover", cover.value);
      formData.append(
        "fields",
        JSON.stringify(
          fields.value.map(({ name, type }) => ({ name, type }))
        )
      );

      try {
        await axios.post("/api/CollectionList/", formData);
        router.push({ name: "Collections" }); // redirect after creation
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    };

    return {
      stage,
      title,
      type,
      description,
      cover,
      fields,
      nextStage,
      addField,
      removeField,
      onCoverUpload,
      submitCollection,
    };
  },
});
</script>

<style></style>
