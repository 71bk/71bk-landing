// UI Store - UI 狀態管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // ==========================================
  // State
  // ==========================================
  
  // 當前語言（與 vue-i18n 同步）
  const locale = ref('zh-TW')
  
  // 主題（預留）
  const theme = ref('light')
  
  // 行動裝置選單狀態
  const mobileMenuOpen = ref(false)

  // ==========================================
  // Getters
  // ==========================================
  
  const isEnglish = computed(() => locale.value === 'en')
  const isChinese = computed(() => locale.value === 'zh-TW')
  const isDarkTheme = computed(() => theme.value === 'dark')

  // ==========================================
  // Actions
  // ==========================================
  
  const setLocale = (newLocale) => {
    locale.value = newLocale
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'zh-TW' ? 'en' : 'zh-TW'
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    mobileMenuOpen.value = false
  }

  return {
    // State
    locale,
    theme,
    mobileMenuOpen,
    // Getters
    isEnglish,
    isChinese,
    isDarkTheme,
    // Actions
    setLocale,
    toggleLocale,
    setTheme,
    toggleTheme,
    toggleMobileMenu,
    closeMobileMenu
  }
})
