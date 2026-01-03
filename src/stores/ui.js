import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * UI Store
 * 管理全域 UI 狀態（動畫層、選單等）
 * 
 * 設計原則：
 * - 低耦合：只管理狀態，不直接操作 DOM/動畫
 * - 組件透過 store 狀態來決定自己的行為
 */
export const useUiStore = defineStore('ui', () => {
  // ==================
  // State
  // ==================
  
  /** 進站 Loader 是否正在播放 */
  const isLoading = ref(true)
  
  /** 頁面切換動畫是否正在進行 */
  const isTransitioning = ref(false)
  
  /** 選單是否開啟 */
  const isMenuOpen = ref(false)
  
  /** 是否為首次造訪（用於決定是否播放 Loader） */
  const isFirstVisit = ref(true)

  // ==================
  // Getters
  // ==================
  
  /** 任何 overlay 正在顯示時，應該鎖定滾動 */
  const shouldLockScroll = computed(() => {
    return isLoading.value || isTransitioning.value || isMenuOpen.value
  })

  // ==================
  // Actions
  // ==================
  
  /**
   * 完成進站 Loader
   */
  function finishLoading() {
    isLoading.value = false
  }
  
  /**
   * 開始頁面切換動畫
   */
  function startTransition() {
    isTransitioning.value = true
  }
  
  /**
   * 完成頁面切換動畫
   */
  function endTransition() {
    isTransitioning.value = false
  }
  
  /**
   * 切換選單
   */
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  /**
   * 關閉選單
   */
  function closeMenu() {
    isMenuOpen.value = false
  }
  
  /**
   * 檢查是否為首次造訪
   * @param {number} expiryDays - 多少天後重新顯示 Loader（預設 7 天）
   */
  function checkFirstVisit(expiryDays = 7) {
    const STORAGE_KEY = '71bk_visited'
    const stored = localStorage.getItem(STORAGE_KEY)
    
    if (stored) {
      const visitedAt = parseInt(stored, 10)
      const now = Date.now()
      const daysPassed = (now - visitedAt) / (1000 * 60 * 60 * 24)
      
      if (daysPassed < expiryDays) {
        // 還在有效期內，跳過 Loader
        isFirstVisit.value = false
        isLoading.value = false
        return false
      }
    }
    
    // 首次造訪或已過期，記錄時間
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    isFirstVisit.value = true
    isLoading.value = true
    return true
  }

  return {
    // State
    isLoading,
    isTransitioning,
    isMenuOpen,
    isFirstVisit,
    // Getters
    shouldLockScroll,
    // Actions
    finishLoading,
    startTransition,
    endTransition,
    toggleMenu,
    closeMenu,
    checkFirstVisit
  }
})
