<template>
  <Teleport to="body">
    <div
      v-show="isVisible && isEnabled"
      ref="previewRef"
      class="cursor-preview"
      :style="previewStyle"
    >
      <div class="preview-inner">
        <img
          v-if="currentImage"
          :src="currentImage"
          :alt="currentTitle"
          class="preview-image"
        />
        <div v-else class="preview-placeholder">
          <span class="placeholder-text">{{ currentTitle }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, provide, watch } from 'vue'
import { gsap } from 'gsap'
import { useCursorFollow } from '@/composables/useCursorFollow'

// ==================
// Props
// ==================
const props = defineProps({
  /** 預覽圖片尺寸 */
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 200
  },
  /** 偏移量 */
  offsetX: {
    type: Number,
    default: 20
  },
  offsetY: {
    type: Number,
    default: 20
  }
})

// ==================
// Cursor Follow
// ==================
const { position, isVisible, isEnabled, show, hide } = useCursorFollow({
  ease: 0.12
})

// ==================
// State
// ==================
const previewRef = ref(null)
const currentImage = ref('')
const currentTitle = ref('')

// ==================
// Computed Styles
// ==================
const previewStyle = computed(() => ({
  transform: `translate(${position.value.x + props.offsetX}px, ${position.value.y + props.offsetY}px)`,
  width: `${props.width}px`,
  height: `${props.height}px`
}))

// ==================
// Watch for visibility changes - animate scale
// ==================
watch(isVisible, (visible) => {
  if (!previewRef.value) return
  
  if (visible) {
    gsap.fromTo(
      previewRef.value,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
  } else {
    gsap.to(previewRef.value, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
  }
})

// ==================
// API for child components
// ==================
function setPreview(image, title) {
  currentImage.value = image
  currentTitle.value = title
  show()
}

function clearPreview() {
  hide()
}

// Provide to child components
provide('cursorPreview', {
  setPreview,
  clearPreview
})

// Expose for parent
defineExpose({
  setPreview,
  clearPreview,
  show,
  hide
})
</script>

<style scoped>
.cursor-preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  will-change: transform;
}

.preview-inner {
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: rgb(var(--color-surface));
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgb(var(--color-primary) / 0.1) 0%,
    rgb(var(--color-primary) / 0.05) 100%
  );
}

.placeholder-text {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(var(--color-text-muted));
  text-align: center;
  padding: 1rem;
}
</style>
