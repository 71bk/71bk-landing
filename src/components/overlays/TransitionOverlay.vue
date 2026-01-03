<template>
  <div 
    v-show="isActive"
    ref="overlayRef"
    class="transition-overlay"
  >
    <!-- 遮罩背景 -->
    <div ref="overlayBg" class="overlay-bg"></div>
    
    <!-- 頁面標題（可選） -->
    <div class="overlay-content">
      <span ref="pageTitle" class="page-title">{{ currentPageTitle }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useUiStore } from '@/stores/ui'

// ==================
// Props
// ==================
const props = defineProps({
  /** 是否顯示頁面標題 */
  showPageTitle: {
    type: Boolean,
    default: true
  }
})

// ==================
// Store & Router
// ==================
const uiStore = useUiStore()
const router = useRouter()

// ==================
// State
// ==================
const isActive = ref(false)
const currentPageTitle = ref('')

// Refs
const overlayRef = ref(null)
const overlayBg = ref(null)
const pageTitle = ref(null)

// ==================
// Page Title Map
// ==================
const pageTitleMap = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact'
}

function getPageTitle(path) {
  // 精確匹配
  if (pageTitleMap[path]) {
    return pageTitleMap[path]
  }
  // 前綴匹配（如 /projects/xxx）
  for (const [key, value] of Object.entries(pageTitleMap)) {
    if (path.startsWith(key) && key !== '/') {
      return value
    }
  }
  return ''
}

// ==================
// Animation
// ==================
let enterTimeline = null
let leaveTimeline = null

/**
 * 進場動畫（切頁開始）
 */
async function animateEnter(toPath) {
  return new Promise((resolve) => {
    currentPageTitle.value = getPageTitle(toPath)
    isActive.value = true
    
    // 確保 DOM 更新後再設定初始狀態
    setTimeout(() => {
      // 重置初始狀態
      gsap.set(overlayBg.value, { yPercent: 100 })
      gsap.set(pageTitle.value, { opacity: 0, y: 20 })
      
      enterTimeline = gsap.timeline({ onComplete: resolve })
      
      // 遮罩從下方滑入
      enterTimeline.to(
        overlayBg.value,
        { yPercent: 0, duration: 0.5, ease: 'power3.inOut' }
      )
      
      // 頁面標題淡入
      if (props.showPageTitle && pageTitle.value) {
        enterTimeline.to(
          pageTitle.value,
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          '-=0.2'
        )
      }
    }, 10)
  })
}

/**
 * 退場動畫（切頁完成）
 */
async function animateLeave() {
  return new Promise((resolve) => {
    leaveTimeline = gsap.timeline({
      onComplete: () => {
        isActive.value = false
        resolve()
      }
    })
    
    // 頁面標題淡出
    if (props.showPageTitle && pageTitle.value) {
      leaveTimeline.to(
        pageTitle.value,
        { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }
      )
    }
    
    // 遮罩向上滑出
    leaveTimeline.to(
      overlayBg.value,
      { yPercent: -100, duration: 0.5, ease: 'power3.inOut' },
      props.showPageTitle ? '-=0.1' : 0
    )
  })
}

// ==================
// Router Integration
// ==================
let removeBeforeEach = null
let removeAfterEach = null

onMounted(() => {
  // 頁面切換前：播放進場動畫
  removeBeforeEach = router.beforeEach(async (to, from, next) => {
    // 跳過首次載入和 Admin 頁面
    if (!from.name || to.path.startsWith('/admin')) {
      return next()
    }
    
    // 跳過相同頁面
    if (to.path === from.path) {
      return next()
    }
    
    uiStore.startTransition()
    await animateEnter(to.path)
    next()
  })
  
  // 頁面切換後：播放退場動畫
  removeAfterEach = router.afterEach(async (to, from) => {
    // 跳過首次載入和 Admin 頁面
    if (!from.name || to.path.startsWith('/admin')) {
      return
    }
    
    if (uiStore.isTransitioning) {
      // 等待頁面渲染
      await new Promise(r => setTimeout(r, 100))
      await animateLeave()
      uiStore.endTransition()
    }
  })
})

onUnmounted(() => {
  if (removeBeforeEach) removeBeforeEach()
  if (removeAfterEach) removeAfterEach()
})

// 暴露方法
defineExpose({ animateEnter, animateLeave })
</script>

<style scoped>
.transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: all;
}

.overlay-bg {
  position: absolute;
  inset: 0;
  background-color: #0f172a; /* slate-900 */
}

.overlay-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page-title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  opacity: 0;
}
</style>
