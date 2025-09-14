<template>
  <footer>
    <div class="action-container">
      <div class="footer-socials">
        <img src="../assets/Temp-Footer-Logo.svg" alt="" class="footer-logo" />
        <ul class="social-icons">
          <li>
            <img src="../assets/icon-instagram.svg" alt="Instagram Icon" />
          </li>
          <li>
            <img src="../assets/icon-linkedin.svg" alt="LinkedIn Icon" />
          </li>
        </ul>
      </div>
      <div class="footer-links">
        <div class="link-container">
          <h3>Sitemap</h3>
          <ul>
            <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>

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
          <h3>Conctact</h3>
          <ul>
            <router-link :to="{ name: 'FAQ' }"><li>FAQ</li></router-link>
            <router-link :to="{ name: 'Support' }"
              ><li>Support</li></router-link
            >
          </ul>
        </div>
        <div class="link-container">
          <h3>Company</h3>
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
    <div class="copyright-container">
      <p>© {{ currentYear }} All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
footer {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1440px;
  margin: auto;
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: var(--color-light);
  gap: var(--spacing-2xl);
  color: var(--color-light);
}

h3 {
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  text-transform: uppercase;
}

.action-container {
  display: flex;
  width: 100%;
  gap: var(--spacing-3xl);
}

.footer-socials {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-md);

  .footer-logo {
    width: auto;
    height: var(--font-size-xl);
  }

  .social-icons {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);

    li {
      list-style: none;
      cursor: pointer;
      background-color: var(--color-light);
      aspect-ratio: 1 / 1;
      display: flex;
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);

      img {
        width: var(--font-size-md);
        height: auto;
      }
    }
  }
}

.footer-links {
  display: flex;
  margin-left: var(--spacing-3xl);
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;

  .link-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }
  }
}

.copyright-container {
  p {
    opacity: 0.5;
  }
}
</style>
