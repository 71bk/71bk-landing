import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * useReducedMotion - 偵測使用者是否偏好減少動畫
 * 
 * 尊重使用者的 prefers-reduced-motion 設定
 * 在低端設備或使用者有需求時，自動減少或停用動畫
 */
export function useReducedMotion() {
  const prefersReducedMotion = ref(false)
  let mediaQuery = null

  function handleChange(e) {
    prefersReducedMotion.value = e.matches
  }

  onMounted(() => {
    // 檢查瀏覽器是否支援
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = mediaQuery.matches
      
      // 監聽變化
      mediaQuery.addEventListener('change', handleChange)
    }
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return {
    prefersReducedMotion: readonly(prefersReducedMotion)
  }
}

export default useReducedMotion
