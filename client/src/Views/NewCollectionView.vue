<template>
  <div class="new-collection-view">
    <div v-if="stage === 1">
      <!-- Stage 1 UI -->
      <h2>Create Collection</h2>
      <input type="file" @change="onCoverUpload" />
      <Input v-model="title" placeholder="Title" />
      <BaseSelect
        v-model="type"
        :options="collectionTypeOptions"
        placeholder="Type"
      />
      <textarea v-model="description" placeholder="Description"></textarea>
      <BaseButton @click="nextStage">Continue</BaseButton>
    </div>

    <div v-else-if="stage === 2">
      <!-- Stage 2 UI -->
      <h2>Choose Fields</h2>
      <div v-for="(field, index) in fields" :key="index" class="field-row">
        <Input
          v-model="field.name"
          placeholder="Field name"
          :disabled="field.isDefault"
        />
        <BaseSelect
          v-model="field.type"
          :options="fieldTypeOptions"
          :disabled="field.isDefault"
        />
        <BaseButton
          v-if="!field.isDefault"
          @click="removeField(index)"
          >
          Remove
        </BaseButton>
      </div>
      <BaseButton @click="addField">+ Add Field</BaseButton>

      <BaseButton @click="submitCollection">Complete</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import SideNav from "../components/SideNav.vue";
import Input from "@/components/Input.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";

interface CollectionField {
  name: string;
  type: string;
  isDefault?: boolean;
}

interface SelectOption {
  label: string;
  value: string | number;
}

export default defineComponent({
  name: "NewCollectionView",
  components: { SideNav, Input, BaseSelect, BaseButton },
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

    const collectionTypeOptions: SelectOption[] = [
      { label: "Custom", value: "custom" },
      { label: "Select", value: "select" },
    ];

    const fieldTypeOptions: SelectOption[] = [
      { label: "Short Text", value: "short-text" },
      { label: "Long Text", value: "long-text" },
      { label: "Link", value: "link" },
      { label: "Code", value: "code" },
    ];

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
      collectionTypeOptions,
      fieldTypeOptions,
      nextStage,
      addField,
      removeField,
      onCoverUpload,
      submitCollection,
    };
  },
});
</script>

<style scoped>
.new-collection-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  input,
  textarea,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .field-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
