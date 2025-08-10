<template>
  <nav class="sidenav">
    <div class="logo"><img src="#" alt="Vaulto Logo" /></div>

    <div class="profile">
      <div class="avatar"></div>
      <router-link :to="{ name: 'Profile' }" class="user-info">
        <p class="name">John Doe</p>
        <p class="email">john@example.com</p>
      </router-link>
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

<script lang="ts" setup></script>

<style scoped>
.sidenav {
  width: 257px;
  background-color: #f5f5f5;
  padding: 24px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.logo {
  display: flex;
  background-color: #ccc;
}
.profile {
  display: flex;
  padding: 12px 12px;
  align-items: center;
  gap: 12px;
  background: #9c9c9c;
}
.avatar {
  width: 52px;
  height: 52px;
  background-color: #ccc;
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
  background-color: rgb(222, 222, 222);
  padding: 12px 12px;
  display: flex;
  gap: 8px;
}
.nav-links a {
  text-decoration: none;
  color: #333;
}
</style>
