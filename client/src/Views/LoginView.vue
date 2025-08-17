<template>
  <div class="auth-view">
    <h2>Login</h2>
    <div class="auth-form">
      <Input v-model="email" type="email" placeholder="Email" label="Email" />
      <Input
        v-model="password"
        type="password"
        placeholder="Password"
        label="Password"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <BaseButton showText @click="login">Login</BaseButton>
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
import { useTheme } from "../composables/useTheme";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");
const { loadTheme } = useTheme();

const login = async () => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{12,}$/;
  if (!email.value.includes("@")) {
    error.value = "Email must contain @";
    return;
  }
  if (!passwordRegex.test(password.value)) {
    error.value =
      "Password must be at least 12 characters, include an uppercase letter and a number";
    return;
  }
  try {
    const res = await axios.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });
    const userId = res.data.userId;
    localStorage.setItem("userId", userId);
    axios.defaults.headers.common["x-user-id"] = userId;
    await loadTheme();
    router.push({ name: "Dashboard" });
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>

<style scoped>
.auth-view {
  max-width: 400px;
  margin: 0 auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.auth-switch {
  text-align: center;
}

.error {
  color: var(--color-primary);
  font-size: var(--font-size-base);
}
</style>
