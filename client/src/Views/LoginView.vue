<template>
  <div class="auth-view">
    <h2>Login</h2>
    <div class="auth-form">
      <Input v-model="email" type="email" placeholder="Email" label="Email" />
      <Input v-model="password" type="password" placeholder="Password" label="Password" />
      <BaseButton :showIcon="false" @click="login">Login</BaseButton>
    </div>
    <p class="auth-switch">
      Don't have an account?
      <RouterLink to="/register">Register</RouterLink>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Input from "@/components/Input.vue";
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  const res = await axios.post("/api/auth/login", {
    email: email.value,
    password: password.value,
  });
  const userId = res.data.userId;
  localStorage.setItem("userId", userId);
  axios.defaults.headers.common["x-user-id"] = userId;
  router.push({ name: "Dashboard" });
};
</script>

<style scoped>
.auth-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-switch {
  text-align: center;
}
</style>

