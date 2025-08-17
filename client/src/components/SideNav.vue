<template>
  <nav class="sidenav">
    <div class="nav-content">
      <div class="logo-profile-container">
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
          <ChevronRight class="chevron-icon" />

          <DropdownMenu
            v-if="showMenu"
            position="right"
            align="left"
            @click.stop
            class="profile-menu"
          >
            <router-link
              :to="{ name: 'Profile' }"
              @click.stop="showMenu = false"
            >
              Profile
            </router-link>
            <router-link
              :to="{ name: 'Support' }"
              @click.stop="showMenu = false"
            >
              Support
            </router-link>
            <button @click.stop="logout">Logout</button>
          </DropdownMenu>
        </div>
      </div>

      <div class="link-container">
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
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import DropdownMenu from "./DropdownMenu.vue";
import {
  Settings,
  LayoutDashboard,
  LibraryBig,
  ChevronRight,
} from "lucide-vue-next";

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
  width: 257px;
  height: 100vh;
  display: flex;
  position: sticky;
  flex-direction: row;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10;
}

.nav-content {
  width: 257px;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  gap: var(--border-deco-width);
  margin-left: var(--border-deco-width);

  .logo-profile-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: var(--spacing-lg);
    background-color: var(--color-bg);
    border-radius: 0 0 var(--radius-md) 0;
  }

  .link-container {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-lg);
    background-color: var(--color-bg);
    border-radius: 0 var(--radius-md) 0 0;
    height: 100%;
  }
}

.logo {
  display: flex;

  margin-right: 1em;
}

.profile {
  position: relative;
  display: flex;
  padding: 12px 12px;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  .avatar {
    width: 32px;
    aspect-ratio: 1/1;
    background-color: var(--color-secondary);
    border-radius: 50%;
  }
  .user-info {
    margin: 0;
    width: 100%;
  }
  .user-info p {
    font-size: 0.8rem;
  }

  .chevron-icon {
    width: var();
    height: var(--font-size-md);
    color: var(--color-text);
    transition: transform 0.2s ease-in-out;
  }

  .profile-menu {
    a,
    button {
      text-align: left;
      padding: 4px 8px;
      text-decoration: none;
      color: var(--color-text);
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }

    a:hover,
    button:hover {
      background-color: var(--color-surface-alt);
    }
  }
}

.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 4px;
  flex-direction: column;

  li {
    background-color: none;
    padding: 12px 12px;
    display: flex;
    gap: 8px;
    border-radius: var(--radius-sm);
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
</style>
