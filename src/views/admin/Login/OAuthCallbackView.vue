<template>
  <div
    class="dark relative min-h-screen overflow-hidden bg-[#f5f8f7] font-sans antialiased text-slate-900 dark:bg-[#0f2317] dark:text-slate-100"
  >
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
      <div
        class="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#06c656]/10 blur-[120px] mix-blend-screen"
      ></div>
      <div
        class="absolute bottom-0 right-0 h-[500px] w-[600px] rounded-full bg-[#06c656]/5 blur-[100px] mix-blend-screen"
      ></div>
    </div>

    <div class="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div
        class="relative z-10 w-full max-w-[440px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-white/5 dark:bg-[#1a2c23]"
      >
        <div class="flex flex-col items-center px-8 pt-10 pb-2 text-center space-y-3">
          <div class="flex items-center gap-2 mb-1">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#06c656]/20 text-[#06c656]">
              <span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              71BK 作品集
            </span>
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">管理後台</h1>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex min-h-[240px] flex-1 flex-col items-center justify-center px-8 py-8">
          <div class="flex flex-col items-center gap-6">
            <div class="relative">
              <div class="absolute inset-0 rounded-full bg-[#06c656]/20 blur-xl"></div>
              <svg
                class="relative z-10 h-14 w-14 animate-spin text-[#06c656]"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                <path
                  class="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div class="space-y-1 text-center">
              <p class="text-lg font-medium text-slate-700 dark:text-slate-200">正在驗證 LINE 登入...</p>
              <p class="text-sm text-slate-500 dark:text-slate-500">請稍候，正在建立安全連線。</p>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="hasError" class="flex min-h-[240px] flex-1 flex-col items-center justify-center px-8 py-8">
          <div class="flex w-full flex-col items-center gap-6">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-1 ring-red-500/20 dark:text-red-400"
            >
              <span class="material-symbols-outlined text-[28px]">gpp_bad</span>
            </div>
            <div class="space-y-2 text-center max-w-[320px]">
              <p class="text-lg font-bold text-slate-900 dark:text-white">驗證失敗</p>
              <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {{ errorMessage }}
              </p>
            </div>
            <router-link
              to="/admin/login"
              class="group mt-2 flex h-10 w-full max-w-[200px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 transition-all hover:border-[#06c656] hover:text-[#06c656] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-[#06c656] dark:hover:text-[#06c656]"
            >
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>返回登入頁</span>
            </router-link>
          </div>
        </div>

        <!-- Success State (brief, before redirect) -->
        <div v-else-if="isSuccess" class="flex min-h-[240px] flex-1 flex-col items-center justify-center px-8 py-8">
          <div class="flex flex-col items-center gap-6">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-[#06c656]/10 text-[#06c656] ring-1 ring-[#06c656]/20"
            >
              <span class="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <div class="space-y-1 text-center">
              <p class="text-lg font-medium text-slate-700 dark:text-slate-200">登入成功！</p>
              <p class="text-sm text-slate-500 dark:text-slate-500">正在導向儀表板...</p>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-100 bg-slate-50/50 px-8 py-6 text-center dark:border-white/5 dark:bg-black/20">
          <p class="text-xs font-medium text-slate-400 dark:text-slate-600">v1.0.0 &copy; 2024 71BK</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const hasError = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    // OAuth callback 後，後端會自動設置 Cookie
    // 前端只需要呼叫 /auth/me 確認登入成功
    await authStore.fetchCurrentUser()
    
    // 登入成功
    isLoading.value = false
    isSuccess.value = true
    
    // 短暫顯示成功訊息後導向 Dashboard
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 1000)
    
  } catch (error) {
    // 登入失敗
    isLoading.value = false
    hasError.value = true
    
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = '登入驗證流程中斷或授權失敗，請重新嘗試。'
    }
    
    console.error('OAuth callback error:', error)
  }
})
</script>
