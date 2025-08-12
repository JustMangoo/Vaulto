<template>
  <nav class="sidenav">
    <div class="logo"><img src="#" alt="Vaulto Logo" /></div>

    <div class="profile" @click="toggleMenu">
      <div class="avatar"></div>
      <div class="user-info">
        <p class="name">John Doe</p>
        <p class="email">john@example.com</p>
      </div>
      <div v-if="showMenu" class="profile-menu">
        <router-link :to="{ name: 'Profile' }" @click.stop="showMenu = false"
          >Profile</router-link
        >
        <router-link :to="{ name: 'Support' }" @click.stop="showMenu = false"
          >Support</router-link
        >
        <button @click.stop="logout">Logout</button>
      </div>
    </div>
    <ul class="nav-links">
      <li><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
      <li>
        <router-link :to="{ name: 'Collections' }">Collections</router-link>
      </li>
      <li><router-link :to="{ name: 'Settings' }">Settings</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const showMenu = ref(false);
const router = useRouter();

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function logout() {
  localStorage.removeItem("userId");
  delete axios.defaults.headers.common["x-user-id"];
  showMenu.value = false;
  router.push({ name: "Login" });
}
</script>

<style scoped>
.sidenav {
  width: 257px;
  background-color: var(--color-surface);
  padding: 24px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--color-text);
}
.logo {
  display: flex;
  background-color: var(--color-secondary);
}
.profile {
  position: relative;
  display: flex;
  padding: 12px 12px;
  align-items: center;
  gap: 12px;
  background: var(--color-surface-alt);
  cursor: pointer;
  color: var(--color-text);
}
.avatar {
  width: 52px;
  height: 52px;
  background-color: var(--color-secondary);
  border-radius: 50%;
}
.user-info {
  margin: 0;
}
.user-info p {
  font-size: 0.8rem;
}
.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 4px;
  flex-direction: column;
}
.nav-links li {
  background-color: var(--color-surface-alt);
  padding: 12px 12px;
  display: flex;
  gap: 8px;
}
.nav-links a {
  text-decoration: none;
  color: var(--color-text);
}

.profile-menu {
  position: absolute;
  top: 0;
  left: calc(100% + 8px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.profile-menu a,
.profile-menu button {
  text-align: left;
  padding: 4px 8px;
  text-decoration: none;
  color: var(--color-text);
  background: none;
  border: none;
  cursor: pointer;
}

.profile-menu a:hover,
.profile-menu button:hover {
  background-color: var(--color-surface-alt);
}
</style>
