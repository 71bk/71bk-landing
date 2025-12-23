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

export default router;
