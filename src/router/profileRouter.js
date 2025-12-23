const profileRoutes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/profile/home/HomeView.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/profile/about/AboutView.vue"),
      },
      {
        path: "projects",
        name: "projects",
        component: () => import("@/views/profile/projects/ProjectsView.vue"),
      },
      {
        path: "projects/:slug",
        name: "project-detail",
        component: () => import("@/views/profile/projects/ProjectDetailView.vue"),
      },
      {
        path: "privacy",
        name: "privacy",
        component: () => import("@/views/profile/legal/PrivacyView.vue"),
      },
      {
        path: "terms",
        name: "terms",
        component: () => import("@/views/profile/legal/TermsView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/profile/NotFoundView.vue"),
  },
];

export default profileRoutes;
