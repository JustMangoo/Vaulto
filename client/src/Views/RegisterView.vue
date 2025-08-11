<template>
  <div class="auth-view">
    <h2>Register</h2>
    <div class="auth-form">
      <Input
        v-model="name"
        autocomplete="username"
        placeholder="Name"
        label="Name"
      />
      <Input
        v-model="email"
        type="email"
        autocomplete="email"
        placeholder="Email"
        label="Email"
      />
      <Input
        v-model="password"
        type="password"
        autocomplete="new-password"
        placeholder="Password"
        label="Password"
      />
      <Input
        v-model="confirmPassword"
        type="password"
        autocomplete="new-password"
        placeholder="Confirm Password"
        label="Confirm Password"
      />
      <BaseButton showText @click="register">Register</BaseButton>
    </div>
    <p class="auth-switch">
      Already have an account?
      <RouterLink to="/login">Login</RouterLink>
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
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const register = async () => {
  if (password.value !== confirmPassword.value) {
    return;
  }
  await axios.post("/api/auth/register", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
  router.push({ name: "Login" });
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
