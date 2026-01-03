<template>
  <div
    class="dark relative min-h-screen overflow-hidden bg-[#f5f8f7] font-sans antialiased dark:bg-[#0f2317]"
  >
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0f2317]/80 to-[#0f172a]"></div>
      <div
        class="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06c656]/5 blur-[100px] pointer-events-none"
      ></div>
    </div>

    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main
        class="w-full max-w-[440px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl transition-all dark:border-slate-700/50 dark:bg-[#1e293b]"
      >
        <div class="flex flex-col items-center px-8 pt-10 pb-8 text-center">
          <div class="mb-6">
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              71BK 作品集
            </span>
          </div>
          <h1 class="mb-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            管理後台
          </h1>
          <p class="mx-auto max-w-[280px] text-base font-normal leading-relaxed text-slate-500 dark:text-slate-400">
            登入以管理您的作品集。
          </p>

          <div class="h-10 w-full"></div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="w-full mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {{ authStore.error }}
          </div>

          <button
            class="group relative flex h-12 w-full items-center justify-center bg-[#06c656] px-6 text-white shadow-lg shadow-green-900/10 transition-all duration-200 hover:bg-[#05b34d] hover:shadow-[0_0_20px_rgba(6,198,86,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            :disabled="authStore.isLoading"
            @click="handleLogin"
          >
            <!-- Loading Spinner -->
            <svg v-if="authStore.isLoading" class="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <!-- LINE Icon -->
            <svg v-else class="w-6 h-6 mr-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.365 9.863c.349-2.944-2.422-5.485-5.325-5.385-3.328.069-5.903 2.871-5.833 6.195.068 2.899 2.585 5.23 5.486 5.176 1.258-.026 2.458-.453 3.447-1.185.748.428 1.83 1.015 2.057 1.12.355.166.772-.191.603-.554-.154-.33-.67-1.463-.846-1.87.893-1.134 1.34-2.479 1.218-3.903l-.807.406zM12.032 13.6c-2.463-.035-4.437-2.035-4.398-4.498.038-2.38 2.029-4.331 4.41-4.332 2.463.048 4.437 2.062 4.398 4.498-.039 2.38-2.03 4.332-4.41 4.332z"/>
              <path d="M24 10.304c0 5.17-4.988 9.478-11.455 9.478-.667 0-1.314-.047-1.936-.129-1.295 1.252-4.035 2.573-4.524 2.766-.688.271-1.04-.492-.587-1.055.672-.836 1.89-2.227 2.195-2.613-3.045-1.504-4.96-3.951-4.96-6.447 0-5.17 5.387-9.479 11.267-9.479C19.988 2.825 24 6.223 24 10.304z"/>
            </svg>
            <span class="text-base font-bold tracking-wide">
              {{ authStore.isLoading ? '導向中...' : '使用 LINE 登入' }}
            </span>
          </button>

          <div class="mt-8 mb-2 flex items-center gap-2 text-slate-400 dark:text-slate-600">
            <span class="material-symbols-outlined text-[16px]">lock</span>
            <span class="text-xs font-medium">限授權人員存取</span>
          </div>
        </div>
        <div
          class="border-t border-slate-100 bg-slate-50 px-8 py-4 text-center dark:border-slate-700/50 dark:bg-[#16202e]"
        >
          <p class="text-xs font-medium text-slate-400 dark:text-slate-500">
            v1.0.0 &middot; &copy; 2024 71BK Engineering
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

// 檢查是否已登入
onMounted(async () => {
  const isLoggedIn = await authStore.checkAuth()
  if (isLoggedIn) {
    router.push('/admin/dashboard')
  }
})

// 處理登入
const handleLogin = async () => {
  try {
    await authStore.login()
  } catch (error) {
    // 錯誤已在 store 中處理
    console.error('Login failed:', error)
  }
}
</script>
