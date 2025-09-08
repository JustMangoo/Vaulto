<template>
  <footer>
    <div class="action-container">
      <div class="footer-form"><h4>Newsletter</h4></div>
      <div class="footer-links">
        <div class="link-container">
          <h4>Sitemap</h4>
          <ul>
            <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>
            <router-link :to="{ name: 'About' }"
              ><li>The Vault</li></router-link
            >
            <router-link :to="{ name: 'Pricing' }"
              ><li>Pricing</li></router-link
            >
            <router-link :to="{ name: 'Login' }"><li>Log In</li></router-link>
            <router-link :to="{ name: 'Register' }"
              ><li>Register</li></router-link
            >
          </ul>
        </div>
        <div class="link-container">
          <h4>Conctact</h4>
          <ul>
            <router-link :to="{ name: 'FAQ' }"><li>FAQ</li></router-link>
            <router-link :to="{ name: 'Support' }"
              ><li>Support</li></router-link
            >
          </ul>
        </div>
        <div class="link-container">
          <h4>Company</h4>
          <ul>
            <router-link :to="{ name: 'Terms' }"
              ><li>Terms & Conditions</li></router-link
            >
            <router-link :to="{ name: 'Privacy' }"
              ><li>Privacy Policy</li></router-link
            >
            <router-link :to="{ name: 'CookiePolicy' }"
              ><li>Cookie Policy</li></router-link
            >
          </ul>
        </div>
      </div>
    </div>
    <div class="logo-container">
      <img src="../assets/Temp-Footer-Logo.svg" alt="Footer Brand Logo" />
    </div>
    <div class="copyright-container"></div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
footer {
  display: flex;
  width: fill;
  padding: 64px 40px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 100px;
  color: var(--color-light);
  background-color: var(--color-dark-1);
}
</style>
