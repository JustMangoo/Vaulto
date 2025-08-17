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
      <div class="add-type">
        <Input v-model="newCategory" placeholder="New type" />
        <BaseButton showText @click="addNewCategory">Add Type</BaseButton>
      </div>
      <textarea v-model="description" placeholder="Description"></textarea>
      <BaseButton showText @click="nextStage">Continue</BaseButton>
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
          showText
          @click="removeField(index)"
        >
          Remove
        </BaseButton>
      </div>
      <BaseButton iconName="Plus" showText showIcon @click="addField">
        Add Field
      </BaseButton>

      <BaseButton showText @click="submitCollection">Complete</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
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

defineOptions({ name: "NewCollectionView" });

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

const defaultTypeOptions: SelectOption[] = [
  { label: "Websites", value: "websites" },
  { label: "Art", value: "art" },
  { label: "3D", value: "3d" },
];

const userTypeOptions = ref<SelectOption[]>([]);
const collectionTypeOptions = computed(() => [
  ...defaultTypeOptions,
  ...userTypeOptions.value,
]);

const newCategory = ref<string>("");

const addNewCategory = async () => {
  if (!newCategory.value.trim()) return;
  try {
    const { data } = await axios.post<string[]>("/api/user/categories", {
      category: newCategory.value.trim(),
    });
    userTypeOptions.value = data.map((c) => ({ label: c, value: c }));
    type.value = newCategory.value.trim();
    newCategory.value = "";
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get<string[]>("/api/user/categories");
    userTypeOptions.value = data.map((c) => ({ label: c, value: c }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

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
    JSON.stringify(fields.value.map(({ name, type }) => ({ name, type })))
  );

  try {
    await axios.post("/api/CollectionList/", formData);
    router.push({ name: "Collections" });
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};
</script>

<style scoped>
.new-collection-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: calc(var(--spacing-xl) + var(--spacing-sm));

  h2 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
  }

  input,
  textarea,
  select {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
    color: var(--color-text);
  }

  .field-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .add-type {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
}
</style>
