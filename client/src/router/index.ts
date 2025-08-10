// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import LandingLayout from "@/layouts/LandingLayout.vue";

const routes = [
  {
    path: "/",
    component: LandingLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/LandingView.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
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
        component: () => import("@/views/DashboardView.vue"),
      },
      {
        path: "collections",
        name: "Collections",
        component: () => import("@/views/CollectionView.vue"),
      },
      {
        path: "collections/new",
        name: "NewCollections",
        component: () => import("@/views/NewCollectionView.vue"),
      },
      {
        path: "/collections/:id",
        name: "CollectionItems",
        component: () => import("@/views/CollectionItemsView.vue"),
      },
      {
        path: "/item/:id",
        name: "ItemDetails",
        component: () => import("@/views/ItemDetailsView.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/SettingsView.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/ProfileView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
