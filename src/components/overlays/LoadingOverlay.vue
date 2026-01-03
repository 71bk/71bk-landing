<template>
  <Transition name="loader">
    <div 
      v-if="isVisible" 
      class="loading-overlay"
      :aria-hidden="!isVisible"
    >
      <!-- Background -->
      <div ref="overlayBg" class="overlay-bg"></div>
      
      <!-- Content -->
      <div class="overlay-content">
        <!-- Greeting Text -->
        <div class="greeting-wrapper">
          <span ref="greetingText" class="greeting-text">{{ currentGreeting }}</span>
        </div>
        
        <!-- Progress Bar (可選) -->
        <div class="progress-wrapper">
          <div ref="progressBar" class="progress-bar"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useUiStore } from '@/stores/ui'

// ==================
// Props & Emits
// ==================
const props = defineProps({
  /** 要輪播的問候語 */
  greetings: {
    type: Array,
    default: () => [
      'Hello',      // 英語
      '你好',        // 中文
      'Bonjour',    // 法語
      'Hola',       // 西班牙語
      'こんにちは',   // 日語
      '안녕하세요',   // 韓語
      'Ciao',       // 義大利語
      'Olá',        // 葡萄牙語
      'Hallo',      // 德語
      'Привет',     // 俄語
      'مرحبا',      // 阿拉伯語
      'สวัสดี',      // 泰語
    ]
  },
  /** 每個問候語顯示的時間 (ms) */
  greetingDuration: {
    type: Number,
    default: 0  // 加快速度：400ms → 200ms
  },
  /** 是否強制顯示（用於測試） */
  forceShow: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['complete'])

// ==================
// Store & State
// ==================
const uiStore = useUiStore()

const isVisible = ref(false)
const currentGreeting = ref(props.greetings[0])

// Refs for GSAP
const overlayBg = ref(null)
const greetingText = ref(null)
const progressBar = ref(null)

// ==================
// Animation Timeline
// ==================
let timeline = null

/**
 * 建立動畫時間軸
 */
function createTimeline() {
  timeline = gsap.timeline({
    onComplete: () => {
      isVisible.value = false
      uiStore.finishLoading()
      emit('complete')
    }
  })

  // 1. 進場淡入
  timeline.fromTo(
    overlayBg.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' }
  )

  // 2. 問候語輪播（快速閃過）
  props.greetings.forEach((greeting, index) => {
    // 更新文字
    timeline.call(() => {
      currentGreeting.value = greeting
    })
    
    // 文字進場（極快）
    timeline.fromTo(
      greetingText.value,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }
    )
    
    // 停留
    timeline.to({}, { duration: props.greetingDuration / 1000 })
    
    // 文字退場（極快，最後一個不退）
    if (index < props.greetings.length - 1) {
      timeline.to(
        greetingText.value,
        { opacity: 0, y: -10, duration: 0.05, ease: 'power2.in' }
      )
    }
  })

  // 3. Progress bar 動畫（與問候語同步）
  const totalDuration = props.greetings.length * (props.greetingDuration / 1000 + 0.13)
  timeline.to(
    progressBar.value,
    { scaleX: 1, duration: totalDuration, ease: 'none' },
    0.3 // 從進場動畫後開始
  )

  // 4. 短暫停留
  timeline.to({}, { duration: 0.3 })

  // 5. 文字和進度條快速淡出
  timeline.to(
    [greetingText.value, progressBar.value],
    { opacity: 0, duration: 0.15, ease: 'power2.in' }
  )

  // 5. 遮罩快速收起
  timeline.to(overlayBg.value, {
    yPercent: -100,
    duration: 0.5,
    ease: 'power3.inOut'
  }, '-=0.1')

  return timeline
}

/**
 * 播放動畫
 */
function play() {
  // 先顯示 overlay，讓 DOM 渲染
  isVisible.value = true
  
  // 使用 nextTick 確保 DOM 更新後再取得 refs
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      // 再等一個 frame 確保 refs 已經綁定
      requestAnimationFrame(() => {
        if (overlayBg.value && greetingText.value && progressBar.value) {
          createTimeline()
        } else {
          console.warn('LoadingOverlay refs not ready')
        }
      })
    })
  })
}

/**
 * 跳過動畫
 */
function skip() {
  if (timeline) {
    timeline.progress(1)
  }
}

// ==================
// Lifecycle
// ==================
onMounted(() => {
  // 測試模式：每次都播放 Loader
  // TODO: 之後改用 js-cookie
  const shouldPlay = props.forceShow || true
  
  if (shouldPlay) {
    play()
  } else {
    isVisible.value = false
  }
})

// 暴露方法給父組件
defineExpose({ play, skip })
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}

.greeting-wrapper {
  overflow: hidden;
  padding: 0.5rem 0;
}

.greeting-text {
  display: block;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
  will-change: transform, opacity;
}

.progress-wrapper {
  width: 120px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;
  background-color: white;
  transform-origin: left;
  transform: scaleX(0);
}

/* Transition for component mount/unmount */
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.3s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
