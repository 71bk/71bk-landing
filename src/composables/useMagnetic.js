import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * useMagnetic - 磁吸效果 Composable
 * 
 * 讓按鈕在滑鼠接近時產生「被吸引」的效果
 * 
 * 設計原則：
 * - 滑鼠進入時，元素朝向滑鼠移動
 * - 滑鼠離開時，元素回到原位
 * - 移動端自動禁用
 */
export function useMagnetic(elementRef, options = {}) {
  const {
    strength = 0.3,        // 磁吸強度 (0-1)
    ease = 'power3.out',   // 回彈動畫 ease
    duration = 0.4         // 回彈動畫時間
  } = options

  const isEnabled = ref(true)

  /**
   * 取得實際的 DOM 元素
   * 如果 ref 指向的是 Vue 組件，則使用 $el
   */
  function getElement() {
    if (!elementRef.value) return null
    
    // 如果是 Vue 組件實例，取得 $el
    if (elementRef.value.$el) {
      return elementRef.value.$el
    }
    
    // 如果已經是 DOM 元素
    if (elementRef.value instanceof HTMLElement) {
      return elementRef.value
    }
    
    return null
  }

  function handleMouseMove(e) {
    const el = getElement()
    if (!el || !isEnabled.value) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 計算滑鼠相對於中心的偏移
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    // 套用磁吸效果（移動距離 = 偏移 * 強度）
    gsap.to(el, {
      x: deltaX * strength,
      y: deltaY * strength,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  function handleMouseLeave() {
    const el = getElement()
    if (!el) return

    // 回到原位
    gsap.to(el, {
      x: 0,
      y: 0,
      duration,
      ease
    })
  }

  function checkMobile() {
    // 移動端禁用磁吸效果
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    isEnabled.value = !isMobile
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })

  return {
    isEnabled,
    handleMouseMove,
    handleMouseLeave
  }
}

export default useMagnetic
