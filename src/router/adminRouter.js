const adminRoutes = [
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/views/admin/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "admin-dashboard",
    component: () => import("@/views/admin/DashboardView.vue"),
  },
  {
    path: "/admin/portfolio",
    name: "admin-portfolio",
    component: () => import("@/views/admin/PortfolioListView.vue"),
  },
  {
    path: "/admin/portfolio/new",
    name: "admin-portfolio-new",
    component: () => import("@/views/admin/PortfolioEditorView.vue"),
  },
  {
    path: "/admin/portfolio/:id",
    name: "admin-portfolio-edit",
    component: () => import("@/views/admin/PortfolioEditorView.vue"),
    props: true,
  },
  {
    path: "/admin/line/users",
    name: "admin-line-users",
    component: () => import("@/views/admin/LineUsersView.vue"),
  },
  {
    path: "/admin/line/logs",
    name: "admin-line-logs",
    component: () => import("@/views/admin/LineLogsView.vue"),
  },
  {
    path: "/admin/analytics",
    name: "admin-analytics",
    component: () => import("@/views/admin/AnalyticsView.vue"),
  },
];

export default adminRoutes;

