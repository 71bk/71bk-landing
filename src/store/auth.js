import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authApi from '@/api/auth'

/**
 * Auth Store
 * 管理 Admin 後台的認證狀態
 */
export const useAuthStore = defineStore('auth', () => {
  // ============ State ============
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // ============ Getters ============
  const isAuthenticated = computed(() => !!user.value)
  
  const isAdmin = computed(() => {
    return user.value?.role === 'ADMIN'
  })

  const displayName = computed(() => {
    return user.value?.displayName || user.value?.display_name || 'Unknown'
  })

  const avatarUrl = computed(() => {
    return user.value?.pictureUrl || user.value?.picture_url || null
  })

  const lineUserId = computed(() => {
    return user.value?.lineUserId || user.value?.line_user_id || null
  })

  // ============ Actions ============

  /**
   * 開始 LINE 登入流程
   * 取得登入 URL 並導向
   */
  const login = async () => {
    try {
      isLoading.value = true
      error.value = null
      const loginUrl = await authApi.getLineLoginUrl()
      // 導向 LINE 登入頁
      window.location.href = loginUrl
    } catch (err) {
      error.value = err.message || '取得登入網址失敗'
      console.error('Login error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 取得當前登入的使用者資訊
   * 用於 OAuth Callback 後或頁面載入時驗證登入狀態
   */
  const fetchCurrentUser = async () => {
    try {
      isLoading.value = true
      error.value = null
      const userData = await authApi.getCurrentUser()
      user.value = userData
      return userData
    } catch (err) {
      user.value = null
      error.value = err.message || '取得使用者資訊失敗'
      console.error('Fetch user error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 驗證登入狀態 (靜默檢查，不拋錯)
   */
  const checkAuth = async () => {
    try {
      isLoading.value = true
      const userData = await authApi.verifyAuth()
      user.value = userData
      return !!userData
    } catch (err) {
      user.value = null
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 刷新 Session Token
   */
  const refreshSession = async () => {
    try {
      await authApi.refreshToken()
      // 刷新成功後重新取得用戶資訊
      await fetchCurrentUser()
    } catch (err) {
      console.error('Refresh session error:', err)
      throw err
    }
  }

  /**
   * 登出
   */
  const logout = async () => {
    try {
      isLoading.value = true
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
      // 即使 API 失敗也要清除本地狀態
    } finally {
      // 清除本地狀態
      user.value = null
      error.value = null
      isLoading.value = false
    }
  }

  /**
   * 清除錯誤狀態
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    displayName,
    avatarUrl,
    lineUserId,
    // Actions
    login,
    fetchCurrentUser,
    checkAuth,
    refreshSession,
    logout,
    clearError
  }
})
