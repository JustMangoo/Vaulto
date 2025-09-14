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
          <h4>Sitemap</h4>
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
  width: fill;
  max-width: 1440px;
  margin: auto;
  padding: 64px 40px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 100px;
  color: var(--color-light);
}

.action-container {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
}

h4 {
  color: var(--color-primary);
  font-size: var(--font-size-base);
  font-weight: 400;
  text-transform: uppercase;
}

.footer-socials {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  .footer-logo {
    width: 150px;
    height: auto;
  }
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  li {
    list-style: none;
    cursor: pointer;
    background-color: var(--color-light);
    aspect-ratio: 1 / 1;
    display: flex;
    padding: var(--spacing-md);
    border-radius: 100%;
  }
}

.link-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.footer-links {
  display: flex;
  width: 698px;
  padding-left: 50px;
  justify-content: space-between;
  align-items: flex-start;

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  li {
    color: var(--color-light);
    font-size: var(--font-size-md);
    font-weight: 400;
  }
}

.copyright-container {
  p {
    color: var(--color-light);
    font-size: var(--font-size-md);
    font-weight: 400;
    opacity: 0.5;
  }
}
</style>
