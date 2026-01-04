import { createRouter, createWebHistory } from "vue-router";
import adminRouter from "./adminRouter";
import profileRouter from "./profileRouter";

const routes = [...profileRouter, ...adminRouter];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如使用瀏覽器的前進/後退按鈕）
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Admin 路由認證守衛（暫時停用）
router.beforeEach(async (to, from, next) => {
  // TODO: 記得重新啟用認證！
  // 暫時略過認證檢查
  next();
  return;

  // === 原始認證邏輯（已停用）===
  // 檢查是否為需要認證的 Admin 路由
  const isAdminRoute = to.path.startsWith('/admin');
  const isPublicAdminRoute = ['/admin/login', '/admin/oauth-callback'].includes(to.path);

  if (isAdminRoute && !isPublicAdminRoute) {
    // 動態導入 authStore 以避免循環依賴
    const { useAuthStore } = await import('@/store/auth');
    const authStore = useAuthStore();

    // 如果尚未檢查過認證狀態，先檢查
    if (!authStore.isAuthenticated) {
      const isLoggedIn = await authStore.checkAuth();
      if (!isLoggedIn) {
        // 未登入，導向登入頁
        return next({
          path: '/admin/login',
          query: { redirect: to.fullPath }
        });
      }
    }
  }

  next();
});

export default router;

