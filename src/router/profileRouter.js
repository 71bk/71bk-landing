const profileRoutes = [
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../views/profile/PrivacyView.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("../views/profile/TermsView.vue"),
  },
];

export default profileRoutes;
