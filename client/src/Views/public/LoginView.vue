<template>
  <div id="login-view">
    <div class="form">
      <div class="input-group">
        <Input v-model="email" type="email" label="Email" />
        <Input v-model="password" type="password" label="Password" />
        <p v-if="error" class="error">{{ error }}</p>
        <BaseButton showText @click="login">Enter Vault</BaseButton>
      </div>
      <div class="form-footer">
        <svg
          width="417"
          height="8"
          viewBox="0 0 417 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="divider"
        >
          <path
            d="M11.6779 6.16684C-1.32994 3.36434 -14.3752 0.771402 50.031 1.01603C115.467 1.26458 270.265 2.05273 415.667 2.05273"
            stroke="inherit"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <div class="links">
          <p>Forgot password?</p>
          <p>
            New here?
            <RouterLink to="/register">Start for free</RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="info">
      <h1>Your vault of <span>inspiration</span></h1>
      <p>Log in and pick up where your creativity left off.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Input from "@/components/Input.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useTheme } from "../../composables/useTheme";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");
const { loadTheme } = useTheme();

const login = async () => {
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
#login-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  gap: var(--border-width-deco);

  h1 {
    text-align: left;
  }

  .form {
    display: flex;
    flex: 2;
    flex-direction: column;
    background: var(--color-accent);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    border-radius: var(--radius-md);
    gap: var(--spacing-2xl);

    .input-group {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .form-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-lg);

      .links {
        display: flex;
        width: 100%;
        justify-content: space-between;

        a {
          font-weight: var(--font-weight-semibold);
          text-decoration-line: underline;
          text-decoration-skip-ink: auto;
          text-decoration-color: var(--color-secondary, #ffcf9d);
          text-decoration-thickness: 9%;
          text-underline-offset: 11%;
          text-underline-position: from-font;
        }
      }
    }

    svg.divider {
      width: 100%;
      height: auto;
      stroke: var(--color-secondary);
    }
  }
  .info {
    display: flex;
    flex: 3;
    align-self: stretch;
    justify-content: center;
    flex-direction: column;
    background: var(--color-light);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    border-radius: var(--radius-md);
  }
}

.error {
  color: var(--color-error);
  font-size: var(--font-size-base);
}
</style>
