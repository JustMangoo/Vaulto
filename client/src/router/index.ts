// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/Layouts/AppLayout.vue";
import LandingLayout from "@/Layouts/LandingLayout.vue";

const routes = [
  {
    path: "/",
    component: LandingLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/Views/public/LandingView.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/Views/public/LoginView.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/Views/public/RegisterView.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/Views/public/AboutView.vue"),
      },
      {
        path: "pricing",
        name: "Pricing",
        component: () => import("@/Views/public/PricingView.vue"),
      },
      {
        path: "faq",
        name: "FAQ",
        component: () => import("@/Views/public/FAQView.vue"),
      },
      {
        path: "support",
        name: "Support",
        component: () => import("@/Views/public/SupportView.vue"),
      },
      {
        path: "terms",
        name: "Terms",
        component: () => import("@/Views/public/TermsView.vue"),
      },
      {
        path: "privacy",
        name: "Privacy",
        component: () => import("@/Views/public/PrivacyView.vue"),
      },
      {
        path: "cookie-policy",
        name: "CookiePolicy",
        component: () => import("@/Views/public/CookiePolicyView.vue"),
      },
    ],
  },
  {
    path: "/app",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "Dashboard",
        component: () => import("@/Views/app/DashboardView.vue"),
      },
      {
        path: "collections",
        name: "Collections",
        component: () => import("@/Views/app/CollectionView.vue"),
      },
      {
        path: "collections/new",
        name: "NewCollections",
        component: () => import("@/Views/app/NewCollectionView.vue"),
      },
      {
        path: "/collections/:id",
        name: "CollectionItems",
        component: () => import("@/Views/app/CollectionItemsView.vue"),
      },
      {
        path: "/item/:id",
        name: "ItemDetails",
        component: () => import("@/Views/app/ItemDetailsView.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/Views/app/SettingsView.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/Views/app/ProfileView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return next({ name: "Login" });
    }
  }
  next();
});

export default router;
