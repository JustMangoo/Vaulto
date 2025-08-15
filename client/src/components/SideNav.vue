<template>
  <nav class="sidenav">
    <div class="nav-content">
      <div class="logo">
        <h2 style="font-size: 20px">VAULTO</h2>
        <!-- <img src="#" alt="Vaulto Logo" /> -->
      </div>

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
      <DecorationLine
        :fadeStart="true"
        :fadeEnd="false"
        thickness="2px"
        length="100%"
        class=""
      />
      <ul class="nav-links">
        <router-link :to="{ name: 'Dashboard' }"
          ><li>
            <LayoutDashboard class="link-icon" />
            Dashboard
          </li>
        </router-link>
        <router-link :to="{ name: 'Collections' }">
          <li>
            <LibraryBig class="link-icon" />
            Collections
          </li>
        </router-link>
        <router-link :to="{ name: 'Settings' }">
          <li>
            <Settings class="link-icon" />
            Settings
          </li>
        </router-link>
      </ul>
    </div>
    <DecorationLine
      orientation="vertical"
      :fadeStart="true"
      :fadeEnd="true"
      cap="60px"
      thickness="2px"
      length="100%"
    />
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DecorationLine from "./DecorationLine.vue";
import { Settings, LayoutDashboard, LibraryBig } from "lucide-vue-next";

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
nav {
  padding: 20px 0;
  width: 257px;
  height: 100vh;
  display: flex;
  position: sticky;
  flex-direction: row;
  align-items: center;
  left: 0;
  top: 0;
}

.nav-content {
  width: 257px;
  padding: 20px 0 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--color-text);
}

.logo {
  display: flex;

  margin-right: 20px;
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
  margin-right: 20px;
  border-radius: 8px;

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
}

.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 4px;
  flex-direction: column;
  margin-right: 20px;

  li {
    background-color: none;
    padding: 12px 12px;
    display: flex;
    gap: 8px;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;

    link-icon {
      width: 20px;
      height: 20px;
      color: var(--color-text);
    }
  }

  li:hover {
    background-color: var(--color-surface-alt);
  }
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
