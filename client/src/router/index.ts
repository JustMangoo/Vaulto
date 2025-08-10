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
        component: () => import("@/Views/LandingView.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/Views/LoginVIew.vue"),
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
        component: () => import("@/Views/DashboardView.vue"),
      },
      {
        path: "collections",
        name: "Collections",
        component: () => import("@/Views/CollectionView.vue"),
      },
      {
        path: "collections/new",
        name: "NewCollections",
        component: () => import("@/Views/NewCollectionView.vue"),
      },
      {
        path: "/collections/:id",
        name: "CollectionItems",
        component: () => import("@/Views/CollectionItemsView.vue"),
      },
      {
        path: "/item/:id",
        name: "ItemDetails",
        component: () => import("@/Views/ItemDetailsView.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/Views/SettingsView.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/Views/ProfileView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
