import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

/**
 * useCursorFollow - 游標跟隨 Composable
 * 
 * 讓元素跟隨滑鼠移動，帶有平滑的緩動效果
 * 
 * 設計原則：
 * - 使用 GSAP 實現平滑跟隨
 * - 自動節流 (requestAnimationFrame)
 * - 支援移動端禁用
 */
export function useCursorFollow(options = {}) {
  const {
    ease = 0.15,               // 跟隨速度 (0-1，越小越慢)
    enableOnMobile = false      // 是否在移動端啟用
  } = options

  const position = ref({ x: 0, y: 0 })
  const targetPosition = ref({ x: 0, y: 0 })
  const isVisible = ref(false)
  const isEnabled = ref(true)

  let animationId = null

  /**
   * 更新目標位置
   */
  function updatePosition(x, y) {
    targetPosition.value = { x, y }
  }

  /**
   * 顯示跟隨元素
   */
  function show() {
    isVisible.value = true
  }

  /**
   * 隱藏跟隨元素
   */
  function hide() {
    isVisible.value = false
  }

  /**
   * 動畫循環 - 使用線性插值實現平滑跟隨
   */
  function animate() {
    // 線性插值：當前位置 + (目標位置 - 當前位置) * 速度
    position.value.x += (targetPosition.value.x - position.value.x) * ease
    position.value.y += (targetPosition.value.y - position.value.y) * ease

    animationId = requestAnimationFrame(animate)
  }

  /**
   * 全域滑鼠移動事件
   */
  function handleMouseMove(e) {
    updatePosition(e.clientX, e.clientY)
  }

  /**
   * 檢查是否為移動設備
   */
  function checkMobile() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    isEnabled.value = enableOnMobile || !isMobile
  }

  onMounted(() => {
    checkMobile()
    
    if (isEnabled.value) {
      // 初始化位置
      position.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      targetPosition.value = { ...position.value }
      
      // 開始動畫循環
      animate()
      
      // 監聽滑鼠移動
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', checkMobile)
    }
  })

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', checkMobile)
  })

  return {
    position,
    isVisible,
    isEnabled,
    show,
    hide,
    updatePosition
  }
}

export default useCursorFollow
