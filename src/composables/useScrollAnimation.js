import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 註冊 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

// 檢查是否偏好減少動畫
function checkReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * useScrollAnimation - 滾動動畫 Composable
 * 
 * 提供常用的滾動動畫效果：
 * - Fade In Up: 元素從下方淡入
 * - Parallax: 視差效果
 * - Scale: 縮放效果
 * 
 * 設計原則：
 * - 低耦合：組件只需傳入 ref 即可
 * - 可重用：統一的動畫參數
 * - 自動清理：onUnmounted 時銷毀 triggers
 * - 尊重 prefers-reduced-motion
 */
export function useScrollAnimation() {
  const triggers = ref([])
  const prefersReducedMotion = checkReducedMotion()

  /**
   * Fade In Up 動畫
   * 元素從下方淡入，常用於區塊進場
   * 
   * @param {Ref} element - 目標元素的 ref
   * @param {Object} options - 選項
   */
  function fadeInUp(element, options = {}) {
    const {
      y = 60,
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      stagger = 0.1
    } = options

    if (!element.value) return

    const elements = Array.isArray(element.value) 
      ? element.value 
      : [element.value]

    // 尊重 prefers-reduced-motion
    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0 })
      return null
    }

    const trigger = ScrollTrigger.create({
      trigger: elements[0],
      start,
      onEnter: () => {
        gsap.fromTo(
          elements,
          { opacity: 0, y },
          { 
            opacity: 1, 
            y: 0, 
            duration, 
            delay,
            stagger,
            ease: 'power3.out'
          }
        )
      },
      once: true
    })

    triggers.value.push(trigger)
    return trigger
  }

  /**
   * Parallax 視差效果
   * 元素隨滾動緩慢移動，產生深度感
   * 
   * @param {Ref} element - 目標元素的 ref
   * @param {Object} options - 選項
   */
  function parallax(element, options = {}) {
    const {
      yPercent = -20,
      start = 'top bottom',
      end = 'bottom top',
      scrub = true
    } = options

    if (!element.value) return

    const trigger = ScrollTrigger.create({
      trigger: element.value,
      start,
      end,
      scrub,
      animation: gsap.to(element.value, {
        yPercent,
        ease: 'none'
      })
    })

    triggers.value.push(trigger)
    return trigger
  }

  /**
   * Scale 縮放動畫
   * 元素從小到大進場
   * 
   * @param {Ref} element - 目標元素的 ref
   * @param {Object} options - 選項
   */
  function scaleIn(element, options = {}) {
    const {
      scale = 0.8,
      duration = 0.6,
      start = 'top 85%'
    } = options

    if (!element.value) return

    const trigger = ScrollTrigger.create({
      trigger: element.value,
      start,
      onEnter: () => {
        gsap.fromTo(
          element.value,
          { opacity: 0, scale },
          { 
            opacity: 1, 
            scale: 1, 
            duration, 
            ease: 'power2.out'
          }
        )
      },
      once: true
    })

    triggers.value.push(trigger)
    return trigger
  }

  /**
   * Stagger 動畫
   * 多個子元素依序進場
   * 
   * @param {Ref} container - 容器元素的 ref
   * @param {String} childSelector - 子元素選擇器
   * @param {Object} options - 選項
   */
  function staggerIn(container, childSelector, options = {}) {
    const {
      y = 40,
      duration = 0.6,
      stagger = 0.1,
      start = 'top 85%'
    } = options

    if (!container.value) return

    const children = container.value.querySelectorAll(childSelector)
    if (!children.length) return

    // 設定初始狀態
    gsap.set(children, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: container.value,
      start,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out'
        })
      },
      once: true
    })

    triggers.value.push(trigger)
    return trigger
  }

  /**
   * 清理所有 ScrollTriggers
   */
  function cleanup() {
    triggers.value.forEach(trigger => trigger.kill())
    triggers.value = []
  }

  // 組件卸載時自動清理
  onUnmounted(() => {
    cleanup()
  })

  return {
    fadeInUp,
    parallax,
    scaleIn,
    staggerIn,
    cleanup
  }
}

export default useScrollAnimation
