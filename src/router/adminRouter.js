import AdminLayout from '@/layouts/AdminLayout.vue'

const adminRoutes = [
  // Login routes (outside AdminLayout)
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/views/admin/Login/LoginView.vue"),
  },
  {
    path: "/admin/oauth-callback",
    name: "admin-oauth-callback",
    component: () => import("@/views/admin/Login/OAuthCallbackView.vue"),
  },
  // Admin routes with AdminLayout
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("@/views/admin/dashBoard/DashboardView.vue"),
      },
      {
        path: "projects",
        name: "admin-projects",
        component: () => import("@/views/admin/portfolio/ProjectListView.vue"),
      },
      {
        path: "projects/new",
        name: "admin-projects-new",
        component: () => import("@/views/admin/portfolio/ProjectEditor.vue"),
      },
      {
        path: "projects/:id",
        name: "admin-projects-edit",
        component: () => import("@/views/admin/portfolio/ProjectEditor.vue"),
        props: true,
      },
      {
        path: "line-users",
        name: "admin-line-users",
        component: () => import("@/views/admin/lineUsers/LineUsersView.vue"),
      },
      {
        path: "line-logs",
        name: "admin-line-logs",
        component: () => import("@/views/admin/lineLogs/LineLogsView.vue"),
      },
      {
        path: "analytics",
        name: "admin-analytics",
        component: () => import("@/views/admin/analytics/AnalyticsView.vue"),
      },
      {
        path: "techs",
        name: "admin-techs",
        component: () => import("@/views/admin/techs/TechTagsView.vue"),
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("@/views/admin/settings/SettingsView.vue"),
      },
    ],
  },
];

export default adminRoutes;
