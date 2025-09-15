<template>
  <div id="register-view">
    <div class="form">
      <div class="input-group">
        <Input v-model="name" autocomplete="none" label="Username" />
        <Input
          v-model="email"
          type="email"
          autocomplete="email"
          label="Email"
        />
        <Input
          v-model="password"
          type="password"
          autocomplete="new-password"
          label="Password"
        />
        <Input
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          label="Confirm Password"
        />
        <p v-if="error" class="error">{{ error }}</p>
        <p class="consent-text">
          By signing up, you consent to Vaulto's
          <RouterLink to="/Terms">Terms of Use</RouterLink> and
          <RouterLink to="/Privacy">Privacy Policy</RouterLink>.
        </p>
        <BaseButton showText @click="register">Create Account</BaseButton>
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
        <p class="auth-switch">
          Already have an account?
          <RouterLink to="/login">Log in</RouterLink>
        </p>
      </div>
    </div>
    <div class="info">
      <div class="info-content">
        <header>
          <h1>Start Your <span>Vault</span></h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="71"
            height="17"
            viewBox="0 0 71 17"
            fill="none"
            class="info-accent"
          >
            <path
              d="M1.6001 13.3214C1.68583 13.3214 6.57592 12.7129 9.75342 12.2457C16.019 11.3244 25.7217 9.41906 25.7217 9.41906M25.7217 9.41906C25.7217 9.41906 28.8367 8.99281 30.7685 8.44858C33.5952 7.65225 37.0072 6.02675 37.6988 5.52991C38.2721 5.11812 38.9566 4.37405 38.3782 3.6926C37.2401 2.35178 35.2004 1.95465 33.6885 1.93257C32.2584 1.91168 30.6984 2.64177 29.0137 3.78547C27.278 4.96376 26.3197 6.53722 25.8651 7.87575C25.6768 8.42999 25.7217 9.41906 25.7217 9.41906ZM25.7217 9.41906C25.7217 9.41906 26.1188 10.6585 26.3996 11.0419C27.4587 12.4878 31.7534 13.2457 31.7534 13.2457C31.7534 13.2457 33.8703 13.5553 41.7534 13.3215C49.6365 13.0877 52.6994 12.381 67.7149 11.7627M59.5279 9.24567C66.3862 10.5316 69.7906 11.3655 69.4672 11.6681C68.1501 12.3163 66.0744 13.6983 64.2969 14.9563C63.904 15.2609 63.6039 15.561 63.2948 16"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </header>
        <p>Create your account and begin saving your first gems.</p>
      </div>
    </div>
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
const emailOptIn = ref(false);
const error = ref("");

const register = async () => {
  error.value = "";
  try {
    await axios.post("/api/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      marketingOptIn: emailOptIn.value,
    });
    router.push({ name: "Login" });
  } catch (err: any) {
    error.value = err.response?.data?.message || "Registration failed";
  }
};
</script>

<style scoped>
#register-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  gap: var(--border-width-deco);
  min-height: 50vw;

  h1 {
    text-align: left;
  }

  a {
    font-weight: var(--font-weight-semibold);
    text-decoration-line: underline;
    text-decoration-skip-ink: auto;
    text-decoration-color: var(--color-primary);
    text-decoration-thickness: 9%;
    text-underline-offset: 11%;
    text-underline-position: from-font;
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
      .consent-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }

    .form-footer {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      .auth-switch {
        text-align: left;
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

    .info-content {
      display: flex;
      flex-direction: column;

      header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--spacing-sm);
      }

      .info-accent {
        height: 30%;
        width: auto;
      }
    }
  }
}

.error {
  color: var(--color-error);
  font-size: var(--font-size-base);
}
</style>
