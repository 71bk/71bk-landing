import axios from "axios";
import router from "@/router";

const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
const baseUrl =
  typeof envBaseUrl === "string" && envBaseUrl.trim() ? envBaseUrl.trim() : "https://admin.71bk.dev";
const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
const apiBaseUrl = /\/api$/.test(normalizedBaseUrl) ? normalizedBaseUrl : `${normalizedBaseUrl}/api`;

// 建立實體時指派預設配置
const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true, // 啟用 Cookie 傳送
  headers: {
    // 跳過 ngrok 的瀏覽器警告頁面，避免 403 Forbidden 錯誤
    'ngrok-skip-browser-warning': 'true',
  },
});

// 新增一個請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 後端使用 Cookie 認證，不需要手動添加 Authorization header
    return config;
  },
  (error) => {
    // 發生請求錯誤時，做些什麼
    return Promise.reject(error);
  }
);
instance.interceptors.request.use((config) => {
  if (typeof config.url === 'string' && config.url.startsWith('/api/')) {
    config.url = config.url.replace(/^\/api/, '')
  }
  return config
})
// 新增一個回應攔截器
instance.interceptors.response.use(
  (response) => {
    // 任何 2xx 的 HTTP 狀態碼，將會觸發此函數
    // 針對回應資料，做些什麼
    // 檢查是否有標準的後端回應格式 {success, code, data}
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // 返回 data 欄位（可能是 null、陣列或物件）
      return response.data.data;
    }
    // 如果不是標準格式，返回原始 response.data
    return response.data ?? null;
  },
  (error) => {
    // 任何 2xx 之外的 HTTP 狀態碼，都會觸發此函數

    // 處理 401 未授權錯誤（Cookie 過期或無效）
    if (error.response?.status === 401) {
      // 特殊處理：如果是 /auth/verify 端點的 401，這是正常的未登入狀態
      const isVerifyEndpoint = error.config?.url?.includes("/auth/verify");

      if (isVerifyEndpoint) {
        // 這是正常的未登入狀態，完全靜默處理
        return Promise.reject({
          handled: true,
          status: 401,
          message: "未登入（正常狀態）",
          silent: true,
        });
      }

      // 清除前端登入狀態
      // 動態導入 authStore 以避免循環依賴
      import('@/store/auth').then(({ useAuthStore }) => {
        const authStore = useAuthStore();
        // 清除使用者資訊（不呼叫後端 logout API，因為 Cookie 已失效）
        authStore.user = null;
      }).catch(err => {
        console.warn('清除使用者狀態時發生錯誤:', err);
      });

      // 檢查是否為公開頁面（登入頁、OAuth 回調頁等）
      const publicPages = ['/admin/login', '/admin/oauth-callback', '/login'];
      const isPublicPage = publicPages.some(page => window.location.pathname.startsWith(page));

      // 如果不是公開頁面，則導向登入頁
      if (!isPublicPage) {
        console.log("🔒 認證已過期，清除登入狀態並導向登入頁");
        router.push({
          path: "/admin/login",
          query: { redirect: window.location.pathname + window.location.search },
        });
      }

      // 401 錯誤已處理
      return Promise.reject({
        handled: true,
        status: 401,
        message: "未授權，已自動處理",
      });
    }

    // 針對其他回應錯誤，做些什麼
    return Promise.reject(error);
  }
);

export default instance;
